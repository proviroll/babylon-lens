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
                QuerySigningInfoRequest: {
                  fields: {
                    consAddress: {
                      type: "string",
                      id: 1,
                    },
                  },
                },
                QuerySigningInfoResponse: {
                  fields: {
                    valSigningInfo: {
                      type: "ValidatorSigningInfo",
                      id: 1,
                    },
                  },
                },
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
                    tombstoned: {
                      type: "bool",
                      id: 5,
                    },
                    missedBlocksCounter: {
                      type: "int64",
                      id: 6,
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
            tendermint: {
              nested: {
                v1beta1: {
                  nested: {
                    GetLatestBlockRequest: {
                      fields: {},
                    },
                    GetLatestBlockResponse: {
                      fields: {
                        blockId: {
                          type: "BlockID",
                          id: 1,
                        },
                        block: {
                          type: "Block",
                          id: 2,
                        },
                      },
                    },
                    Block: {
                      fields: {
                        header: {
                          type: "Header",
                          id: 1,
                        },
                        data: {
                          type: "Data",
                          id: 2,
                        },
                        evidence: {
                          type: "EvidenceList",
                          id: 3,
                        },
                        lastCommit: {
                          type: "Commit",
                          id: 4,
                        },
                      },
                    },
                    Header: {
                      fields: {
                        version: {
                          type: "Consensus",
                          id: 1,
                        },
                        chainId: {
                          type: "string",
                          id: 2,
                        },
                        height: {
                          type: "int64",
                          id: 3,
                        },
                        time: {
                          type: "google.protobuf.Timestamp",
                          id: 4,
                        },
                        lastBlockId: {
                          type: "BlockID",
                          id: 5,
                        },
                        lastCommitHash: {
                          type: "bytes",
                          id: 6,
                        },
                        dataHash: {
                          type: "bytes",
                          id: 7,
                        },
                        validatorsHash: {
                          type: "bytes",
                          id: 8,
                        },
                        nextValidatorsHash: {
                          type: "bytes",
                          id: 9,
                        },
                        consensusHash: {
                          type: "bytes",
                          id: 10,
                        },
                        appHash: {
                          type: "bytes",
                          id: 11,
                        },
                        lastResultsHash: {
                          type: "bytes",
                          id: 12,
                        },
                        evidenceHash: {
                          type: "bytes",
                          id: 13,
                        },
                        proposerAddress: {
                          type: "bytes",
                          id: 14,
                        },
                      },
                    },
                    Consensus: {
                      fields: {
                        block: {
                          type: "uint64",
                          id: 1,
                        },
                        app: {
                          type: "uint64",
                          id: 2,
                        },
                      },
                    },
                    Data: {
                      fields: {
                        txs: {
                          rule: "repeated",
                          type: "bytes",
                          id: 1,
                        },
                      },
                    },
                    EvidenceList: {
                      fields: {
                        evidence: {
                          rule: "repeated",
                          type: "google.protobuf.Any",
                          id: 1,
                        },
                      },
                    },
                    Commit: {
                      fields: {
                        height: {
                          type: "int64",
                          id: 1,
                        },
                        round: {
                          type: "int32",
                          id: 2,
                        },
                        blockId: {
                          type: "BlockID",
                          id: 3,
                        },
                        signatures: {
                          rule: "repeated",
                          type: "CommitSig",
                          id: 4,
                        },
                      },
                    },
                    BlockID: {
                      fields: {
                        hash: {
                          type: "bytes",
                          id: 1,
                        },
                        partSetHeader: {
                          type: "PartSetHeader",
                          id: 2,
                        },
                      },
                    },
                    PartSetHeader: {
                      fields: {
                        total: {
                          type: "int32",
                          id: 1,
                        },
                        hash: {
                          type: "bytes",
                          id: 2,
                        },
                      },
                    },
                    CommitSig: {
                      fields: {
                        blockIdFlag: {
                          type: "int32",
                          id: 1,
                        },
                        validatorAddress: {
                          type: "bytes",
                          id: 2,
                        },
                        timestamp: {
                          type: "google.protobuf.Timestamp",
                          id: 3,
                        },
                        signature: {
                          type: "bytes",
                          id: 4,
                        },
                      },
                    },
                  },
                },
              },
            },
            distribution: {
              nested: {
                v1beta1: {
                  nested: {
                    QueryCommunityPoolRequest: {
                      fields: {},
                    },
                    QueryCommunityPoolResponse: {
                      fields: {
                        pool: {
                          rule: "repeated",
                          type: "cosmos.base.v1beta1.DecCoin",
                          id: 1,
                        },
                      },
                    },
                  },
                },
              },
            },
            bank: {
              nested: {
                v1beta1: {
                  nested: {
                    QueryTotalSupplyRequest: {
                      fields: {
                        pagination: {
                          type: "cosmos.base.query.v1beta1.PageRequest",
                          id: 1,
                        },
                      },
                    },
                    QueryTotalSupplyResponse: {
                      fields: {
                        supply: {
                          rule: "repeated",
                          type: "cosmos.base.v1beta1.Coin",
                          id: 1,
                        },
                        pagination: {
                          type: "cosmos.base.query.v1beta1.PageResponse",
                          id: 2,
                        },
                      },
                    },
                  },
                },
              },
            },
            v1beta1: {
              nested: {
                Coin: {
                  fields: {
                    denom: {
                      type: "string",
                      id: 1,
                    },
                    amount: {
                      type: "string",
                      id: 2,
                    },
                  },
                },
                DecCoin: {
                  fields: {
                    denom: {
                      type: "string",
                      id: 1,
                    },
                    amount: {
                      type: "string",
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
