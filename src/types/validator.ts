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
  consensusPubkey?: string;
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
