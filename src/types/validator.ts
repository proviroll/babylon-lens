export type Validator = {
  operatorAddress: string;
  status: string;
  tokens: string;
  description: {
    moniker: string;
    details: string;
    website: string;
  };
  commission: {
    commissionRates: {
      rate: string;
      maxRate: string;
      maxChangeRate: string;
    };
    updateTime: {
      seconds: string;
      nanos: number;
    };
  };
  jailed: boolean;
  uptime?: string;
  consensusPubkey?: {
    typeUrl: string;
    value: string;
  };
  signingInfo?: ValidatorSigningInfo;
};

export type ValidatorData = {
  validators: Validator[];
  pagination: {
    nextKey: null;
    total: number;
  };
};

export type FilterState = {
  search: string;
  filter: "all" | "jailed" | "active" | "inactive";
  sort: {
    column: "moniker" | "tokens" | "commission" | "uptime" | null;
    direction: "asc" | "desc";
  };
};

export type ChainInfo = {
  latestHeight: string;
  chainId: string;
  communityPool: {
    denom: string;
    amount: string;
  }[];
  totalSupply: {
    denom: string;
    amount: string;
  }[];
};

export type NetworkStats = {
  totalValidators: number;
  activeValidators: number;
  totalSupply: Coin[];
  communityPool: Coin[];
  latestHeight: string;
  chainId: string;
};

export type ValidatorSigningInfo = {
  address: string;
  startHeight: string;
  indexOffset: string;
  jailedUntil: string;
  missedBlocksCounter: string;
};

export type SigningInfoResponse = {
  info: ValidatorSigningInfo[];
  pagination: {
    nextKey: null;
  };
};

export type Coin = {
  denom: string;
  amount: string;
};

export type BlockData = {
  block?: {
    header: {
      height: string;
      chainId: string;
    };
  };
};
  
