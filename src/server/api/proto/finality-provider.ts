import * as protobuf from "protobufjs";

export const finalityProviderProto = protobuf.Root.fromJSON({
  nested: {
    cosmos: {
      nested: {
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
                        reverse: {
                          type: "bool",
                          id: 5,
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
    babylon: {
      nested: {
        btcstaking: {
          nested: {
            v1: {
              nested: {
                QueryFinalityProvidersRequest: {
                  fields: {
                    pagination: {
                      type: "cosmos.base.query.v1beta1.PageRequest",
                      id: 1,
                    },
                  },
                },
                QueryFinalityProvidersResponse: {
                  fields: {
                    finalityProviders: {
                      rule: "repeated",
                      type: "FinalityProvider",
                      id: 1,
                    },
                    pagination: {
                      type: "cosmos.base.query.v1beta1.PageResponse",
                      id: 2,
                    },
                  },
                },
                FinalityProvider: {
                  fields: {
                    description: {
                      type: "Description",
                      id: 1,
                    },
                    commission: {
                      type: "string",
                      id: 2,
                    },
                    addr: {
                      type: "string",
                      id: 3,
                    },
                    btcPk: {
                      type: "bytes",
                      id: 4,
                    },
                    pop: {
                      type: "ProofOfPossession",
                      id: 5,
                    },
                    height: {
                      type: "string",
                      id: 6,
                    },
                    highestVotedHeight: {
                      type: "uint64",
                      id: 7,
                    },
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
                ProofOfPossession: {
                  fields: {
                    btcSig: {
                      type: "bytes",
                      id: 1,
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
});
