export type FinalityProvider = {
  description: {
    moniker: string;
    identity?: string;
    website?: string;
    securityContact?: string;
    details?: string;
  };
  commission: string;
  addr: string;
  btcPk: string;
  pop: {
    btcSig: string;
  };
  height: string;
  highestVotedHeight: string;
};

export type FinalityProviderResponse = {
  finalityProviders: FinalityProvider[];
};
