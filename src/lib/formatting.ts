export const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const formatTokens = (tokens: string) => {
  const amount = Number(tokens) / 1e6;
  return new Intl.NumberFormat("en-US").format(amount);
};


