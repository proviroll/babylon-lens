import { validatorProto } from "@/server/api/proto/validator";
import type {
  BlockData,
  Coin,
  SigningInfoResponse,
  Validator,
  ValidatorSigningInfo,
} from "@/types/validator";
import * as grpc from "@grpc/grpc-js";
import { createTRPCRouter, publicProcedure } from "../trpc";

const root = validatorProto.root;
const grpcUrl = process.env.BABYLON_GRPC_URL!;

export const validatorRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    try {
      const ServiceClient = grpc.makeGenericClientConstructor({}, "Query", {});
      const client = new ServiceClient(
        grpcUrl,
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
      }) as SigningInfoResponse; // Cast to the defined type

      console.log(
        "Raw signing infos response:",
        JSON.stringify(jsonMessage, null, 2),
      );

      const transformedInfo = jsonMessage.info.map(
        (info: ValidatorSigningInfo) => ({
          address: info.address,
          startHeight: info.startHeight?.toString() ?? "0",
          indexOffset: info.indexOffset?.toString() ?? "0",
          jailedUntil: info.jailedUntil ?? "",
          missedBlocksCounter: info.missedBlocksCounter?.toString() ?? "0",
        }),
      );

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
  getChainInfo: publicProcedure.query(async () => {
    try {
      const ServiceClient = grpc.makeGenericClientConstructor({}, "Query", {});
      const client = new ServiceClient(
        "babylon-testnet-grpc.polkachu.com:20690",
        grpc.credentials.createInsecure(),
      );

      // Get latest block
      const blockResponse = await new Promise((resolve, reject) => {
        const RequestType = root.lookupType(
          "cosmos.base.tendermint.v1beta1.GetLatestBlockRequest",
        );
        const message = RequestType.create({});

        client.makeUnaryRequest(
          "/cosmos.base.tendermint.v1beta1.Service/GetLatestBlock",
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

      // Get community pool
      const poolResponse = await new Promise((resolve, reject) => {
        const RequestType = root.lookupType(
          "cosmos.distribution.v1beta1.QueryCommunityPoolRequest",
        );
        const message = RequestType.create({});

        client.makeUnaryRequest(
          "/cosmos.distribution.v1beta1.Query/CommunityPool",
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

      // Get total supply
      const supplyResponse = await new Promise((resolve, reject) => {
        const RequestType = root.lookupType(
          "cosmos.bank.v1beta1.QueryTotalSupplyRequest",
        );
        const message = RequestType.create({});

        client.makeUnaryRequest(
          "/cosmos.bank.v1beta1.Query/TotalSupply",
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

      const BlockResponseType = root.lookupType(
        "cosmos.base.tendermint.v1beta1.GetLatestBlockResponse",
      );
      const PoolResponseType = root.lookupType(
        "cosmos.distribution.v1beta1.QueryCommunityPoolResponse",
      );
      const SupplyResponseType = root.lookupType(
        "cosmos.bank.v1beta1.QueryTotalSupplyResponse",
      );

      const blockData = BlockResponseType.decode(blockResponse as Uint8Array);
      const poolData = PoolResponseType.decode(poolResponse as Uint8Array);
      const supplyData = SupplyResponseType.decode(
        supplyResponse as Uint8Array,
      );

      const jsonBlockData = BlockResponseType.toObject(blockData, {
        longs: String,
        enums: String,
        bytes: String,
      }) as BlockData;
      const jsonPoolData = PoolResponseType.toObject(poolData, {
        longs: String,
        enums: String,
        bytes: String,
      }) as { pool: Coin[] };
      const jsonSupplyData = SupplyResponseType.toObject(supplyData, {
        longs: String,
        enums: String,
        bytes: String,
      }) as { supply: Coin[] };
      console.log({ jsonBlockData, jsonPoolData, jsonSupplyData });

      return {
        latestHeight: jsonBlockData.block?.header?.height ?? "0",
        chainId: jsonBlockData.block?.header?.chainId ?? "unknown",
        communityPool:
          jsonPoolData.pool?.map((coin: Coin) => ({
            denom: coin.denom,
            amount: coin.amount,
          })) ?? [],
        totalSupply:
          jsonSupplyData.supply?.map((coin: Coin) => ({
            denom: coin.denom,
            amount: coin.amount,
          })) ?? [],
      };
    } catch (error) {
      console.error("Error fetching chain info:", error);
      throw error;
    }
  }),
});
