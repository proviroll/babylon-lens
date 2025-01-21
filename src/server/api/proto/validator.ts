import * as protobuf from "protobufjs";

export const validatorProto = protobuf.Root.fromJSON({
  nested: {
    cosmos: {
      nested: {
        staking: {
          nested: {
            v1beta1: {
              nested: {
                QueryValidatorsRequest: {
                  fields: {
                    status: {
                      type: "string",
                      id: 1,
                    },
                    pagination: {
                      type: "cosmos.base.query.v1beta1.PageRequest",
                      id: 2,
                    },
                  },
                },
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
        slashing: {
          nested: {
            v1beta1: {
              nested: {
                QuerySigningInfosRequest: {
                  fields: {
                    pagination: {
                      type: "cosmos.base.query.v1beta1.PageRequest",
                      id: 1,
                    },
                  },
                },
                QuerySigningInfosResponse: {
                  fields: {
                    info: {
                      rule: "repeated",
                      type: "ValidatorSigningInfo",
                      id: 1,
                    },
                    pagination: {
                      type: "cosmos.base.query.v1beta1.PageResponse",
                      id: 2,
                    },
                  },
                },
                ValidatorSigningInfo: {
                  fields: {
                    address: {
                      type: "string",
                      id: 1,
                    },
                    startHeight: {
                      type: "int64",
                      id: 2,
                    },
                    indexOffset: {
                      type: "int64",
                      id: 3,
                    },
                    jailedUntil: {
                      type: "google.protobuf.Timestamp",
                      id: 4,
                    },
                    missedBlocksCounter: {
                      type: "int64",
                      id: 5,
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
                    PageRequest: {
                      fields: {
                        key: {
                          type: "bytes",
                          id: 1,
                        },
                        offset: {
                          type: "uint64",
                          id: 2,
                        },
                        limit: {
                          type: "uint64",
                          id: 3,
                        },
                        countTotal: {
                          type: "bool",
                          id: 4,
                        },
                      },
                    },
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
