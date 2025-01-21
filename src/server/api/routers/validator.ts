import { validatorProto } from "@/server/api/proto/validator";
import { type Validator } from "@/types/validator";
import * as grpc from "@grpc/grpc-js";
import { createTRPCRouter, publicProcedure } from "../trpc";

const root = validatorProto.root;

type ValidatorSigningInfo = {
  address: string;
  startHeight: string;
  indexOffset: string;
  jailedUntil: string; // You can define a more specific type if needed
  missedBlocksCounter: string;
};

export const validatorRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    try {
      const ServiceClient = grpc.makeGenericClientConstructor({}, "Query", {});
      const client = new ServiceClient(
        "babylon-testnet-grpc.polkachu.com:20690",
        grpc.credentials.createInsecure(),
      );

      console.log("Fetching all validators in a single request");
      const response = await new Promise((resolve, reject) => {
        const RequestType = root.lookupType(
          "cosmos.staking.v1beta1.QueryValidatorsRequest",
        );
        const message = RequestType.create({
          pagination: {
            limit: 1000,
          },
        });

        client.makeUnaryRequest(
          "/cosmos.staking.v1beta1.Query/Validators",
          () => Buffer.from(RequestType.encode(message).finish()),
          (value: Buffer) => value,
          {},
          new grpc.Metadata(),
          { deadline: Date.now() + 10000 },
          (err, response) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(response);
          },
        );
      });

      const ResponseType = root.lookupType(
        "cosmos.staking.v1beta1.QueryValidatorsResponse",
      );

      const decodedMessage = ResponseType.decode(response as Uint8Array);
      const jsonMessage = ResponseType.toObject(decodedMessage, {
        longs: String,
        enums: String,
        bytes: String,
      });

      const validators: Validator[] = jsonMessage.validators as Validator[];
      console.log(validators);
      return {
        validators: validators,
        pagination: {
          nextKey: null,
        },
      };
    } catch (error) {
      console.error("Error fetching validators:", error);
      throw error;
    }
  }),
  getSigningInfo: publicProcedure.query(async () => {
    try {
      const ServiceClient = grpc.makeGenericClientConstructor({}, "Query", {});
      const client = new ServiceClient(
        "babylon-testnet-grpc.polkachu.com:20690",
        grpc.credentials.createInsecure(),
      );

      const response = await new Promise((resolve, reject) => {
        const RequestType = root.lookupType(
          "cosmos.slashing.v1beta1.QuerySigningInfosRequest",
        );
        const message = RequestType.create({
          pagination: {
            limit: 1000,
          },
        });

        client.makeUnaryRequest(
          "/cosmos.slashing.v1beta1.Query/SigningInfos",
          () => Buffer.from(RequestType.encode(message).finish()),
          (value: Buffer) => value,
          {},
          new grpc.Metadata(),
          { deadline: Date.now() + 10000 },
          (err, response) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(response);
          },
        );
      });

      const ResponseType = root.lookupType(
        "cosmos.slashing.v1beta1.QuerySigningInfosResponse",
      );

      const decodedMessage = ResponseType.decode(response as Uint8Array);
      const jsonMessage = ResponseType.toObject(decodedMessage, {
        longs: String,
        enums: String,
        bytes: String,
        defaults: true,
      }) as { info: ValidatorSigningInfo[] };

      const transformedInfo = jsonMessage.info.map(
        (info: ValidatorSigningInfo) => ({
          address: info.address,
          startHeight: info.startHeight.toString(),
          indexOffset: info.indexOffset.toString(),
          jailedUntil: info.jailedUntil,
          missedBlocksCounter: info.missedBlocksCounter.toString(),
        }),
      );

      console.log(transformedInfo);

      return {
        signingInfos: transformedInfo,
        pagination: {
          nextKey: null,
        },
      };
    } catch (error) {
      console.error("Error fetching signing info:", error);
      throw error;
    }
  }),
});
