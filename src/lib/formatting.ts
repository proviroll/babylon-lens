export const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const formatTokens = (tokens: string) => {
  const amount = Number(tokens) / 1e6;
  return new Intl.NumberFormat("en-US").format(amount);
};

export const calculateAPY = (commission: string) => {
  const rate = Number(commission) / 1e18;
  return ((1 - rate) * 0.12 * 100).toFixed(2);
};
