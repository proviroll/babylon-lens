import * as grpc from "@grpc/grpc-js";
import * as protobuf from "protobufjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Define the protobuf message types
const root = protobuf.Root.fromJSON({
  nested: {
    cosmos: {
      nested: {
        staking: {
          nested: {
            v1beta1: {
              nested: {
                QueryValidatorsResponse: {
                  fields: {
                    validators: {
                      rule: "repeated",
                      type: "Validator",
                      id: 1,
                    },
                    pagination: {
                      type: "cosmos.base.query.v1beta1.PageResponse",
                      id: 2,
                    },
                  },
                },
                Validator: {
                  fields: {
                    operatorAddress: {
                      type: "string",
                      id: 1,
                    },
                    consensusPubkey: {
                      type: "google.protobuf.Any",
                      id: 2,
                    },
                    jailed: {
                      type: "bool",
                      id: 3,
                    },
                    status: {
                      type: "BondStatus",
                      id: 4,
                    },
                    tokens: {
                      type: "string",
                      id: 5,
                    },
                    delegatorShares: {
                      type: "string",
                      id: 6,
                    },
                    description: {
                      type: "Description",
                      id: 7,
                    },
                    unbondingHeight: {
                      type: "int64",
                      id: 8,
                    },
                    unbondingTime: {
                      type: "google.protobuf.Timestamp",
                      id: 9,
                    },
                    commission: {
                      type: "Commission",
                      id: 10,
                    },
                    minSelfDelegation: {
                      type: "string",
                      id: 11,
                    },
                  },
                },
                BondStatus: {
                  values: {
                    BOND_STATUS_UNSPECIFIED: 0,
                    BOND_STATUS_UNBONDED: 1,
                    BOND_STATUS_UNBONDING: 2,
                    BOND_STATUS_BONDED: 3,
                  },
                },
                Description: {
                  fields: {
                    moniker: {
                      type: "string",
                      id: 1,
                    },
                    identity: {
                      type: "string",
                      id: 2,
                    },
                    website: {
                      type: "string",
                      id: 3,
                    },
                    securityContact: {
                      type: "string",
                      id: 4,
                    },
                    details: {
                      type: "string",
                      id: 5,
                    },
                  },
                },
                Commission: {
                  fields: {
                    commissionRates: {
                      type: "CommissionRates",
                      id: 1,
                    },
                    updateTime: {
                      type: "google.protobuf.Timestamp",
                      id: 2,
                    },
                  },
                },
                CommissionRates: {
                  fields: {
                    rate: {
                      type: "string",
                      id: 1,
                    },
                    maxRate: {
                      type: "string",
                      id: 2,
                    },
                    maxChangeRate: {
                      type: "string",
                      id: 3,
                    },
                  },
                },
              },
            },
          },
        },
        base: {
          nested: {
            query: {
              nested: {
                v1beta1: {
                  nested: {
                    PageResponse: {
                      fields: {
                        nextKey: {
                          type: "bytes",
                          id: 1,
                        },
                        total: {
                          type: "uint64",
                          id: 2,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    google: {
      nested: {
        protobuf: {
          nested: {
            Any: {
              fields: {
                typeUrl: {
                  type: "string",
                  id: 1,
                },
                value: {
                  type: "bytes",
                  id: 2,
                },
              },
            },
            Timestamp: {
              fields: {
                seconds: {
                  type: "int64",
                  id: 1,
                },
                nanos: {
                  type: "int32",
                  id: 2,
                },
              },
            },
          },
        },
      },
    },
  },
});

// Update the validator response type to match the actual API schema
const ValidatorResponse = z.object({
  validators: z.array(
    z.object({
      operatorAddress: z.string(),
      consensusPubkey: z.object({
        "@type": z.string(),
        key: z.string(),
      }),
      status: z.string(),
      tokens: z.string(),
      delegatorShares: z.string(),
      description: z.object({
        moniker: z.string(),
        identity: z.string().optional(),
        website: z.string().optional(),
        securityContact: z.string().optional(),
        details: z.string().optional(),
      }),
      unbondingTime: z.string(),
      commission: z.object({
        commissionRates: z.object({
          rate: z.string(),
          maxRate: z.string(),
          maxChangeRate: z.string(),
        }),
        updateTime: z.string(),
      }),
      minSelfDelegation: z.string(),
      jailed: z.boolean().optional(),
    }),
  ),
  pagination: z.object({
    nextKey: z.string().nullable(),
    total: z.string(),
  }),
});

export const validatorRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return new Promise((resolve, reject) => {
      const ServiceClient = grpc.makeGenericClientConstructor({}, "Query", {});

      const client = new ServiceClient(
        "babylon-testnet-grpc.polkachu.com:20690",
        grpc.credentials.createInsecure(),
      );

      client.makeUnaryRequest(
        "/cosmos.staking.v1beta1.Query/Validators",
        (value: unknown) => Buffer.from(""),
        (value: Buffer) => value,
        {
          pagination: {
            key: Buffer.from(""),
            offset: "0",
            limit: "100",
            countTotal: true,
            reverse: false,
          },
        },
        new grpc.Metadata(),
        { deadline: Date.now() + 5000 },
        (err, response) => {
          if (err) {
            console.error("gRPC error:", err);
            reject(err);
            return;
          }

          try {
            // Decode the protobuf response
            const ResponseType = root.lookupType(
              "cosmos.staking.v1beta1.QueryValidatorsResponse",
            );
            const decodedMessage = ResponseType.decode(response);
            const jsonMessage = ResponseType.toObject(decodedMessage, {
              longs: String,
              enums: String,
              bytes: String,
            });

            console.log("Decoded response:", jsonMessage);
            resolve(jsonMessage);
          } catch (err) {
            console.error("Parsing error:", err);
            reject(err);
          }
        },
      );
    });
  }),
});
