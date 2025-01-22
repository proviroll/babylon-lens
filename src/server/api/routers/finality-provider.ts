import * as grpc from "@grpc/grpc-js";
import { finalityProviderProto } from "../proto/finality-provider";
import { createTRPCRouter, publicProcedure } from "../trpc";

const root = finalityProviderProto;
const grpcUrl = process.env.BABYLON_GRPC_URL;

export const finalityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    try {
      const ServiceClient = grpc.makeGenericClientConstructor({}, "Query", {});
      const client = new ServiceClient(
        grpcUrl,
        grpc.credentials.createInsecure(),
      );

      let allProviders: any[] = [];
      let nextKey: Uint8Array | null = null;

      do {
        console.log("Fetching finality providers page");
        const response = await new Promise((resolve, reject) => {
          const RequestType = root.lookupType(
            "babylon.btcstaking.v1.QueryFinalityProvidersRequest",
          );
          const message = RequestType.create({
            pagination: {
              key: nextKey,
              limit: 100,
            },
          });

          client.makeUnaryRequest(
            "/babylon.btcstaking.v1.Query/FinalityProviders",
            () => Buffer.from(RequestType.encode(message).finish()),
            (value: Buffer) => value,
            {},
            new grpc.Metadata(),
            { deadline: Date.now() + 10000 },
            (err, response) => {
              if (err) {
                console.error("Error during gRPC request:", err);
                reject(err);
                return;
              }
              resolve(response);
            },
          );
        });

        const ResponseType = root.lookupType(
          "babylon.btcstaking.v1.QueryFinalityProvidersResponse",
        );

        const decodedMessage = ResponseType.decode(response as Uint8Array);
        console.log(
          "Decoded message (full):",
          JSON.stringify(decodedMessage, null, 2),
        );

        const jsonMessage = ResponseType.toObject(decodedMessage, {
          longs: String,
          enums: String,
          bytes: String,
        });

        allProviders = allProviders.concat(jsonMessage.finalityProviders);
        nextKey = jsonMessage.pagination?.nextKey
          ? Buffer.from(jsonMessage.pagination.nextKey, "base64")
          : null;
      } while (nextKey);

      console.log("All providers:", JSON.stringify(allProviders, null, 2));

      const providers = allProviders.map((provider: any) => ({
        description: {
          moniker: provider.description.moniker,
          identity: provider.description.identity,
          website: provider.description.website,
          securityContact: provider.description.securityContact,
          details: provider.description.details,
        },
        commission: provider.commission,
        addr: provider.addr,
        btcPk: provider.btcPk,
        pop: {
          btcSig: provider.pop?.btcSig || "",
        },
        height: provider.height || "0",
        highestVotedHeight: provider.highestVotedHeight || "0",
      }));

      return {
        providers,
        pagination: {
          nextKey: null,
        },
      };
    } catch (error) {
      console.error("Error fetching finality providers:", error);
      throw error;
    }
  }),
});
