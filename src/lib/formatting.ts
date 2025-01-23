export const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const formatTokens = (
  tokens: string,
  format?: "tbaby-supply" | "tbaby-pool",
) => {
  const amount = Number(tokens);

  if (format === "tbaby-supply") {
    return formatNumber(amount / 1e15);
  }

  if (format === "tbaby-pool") {
    return formatNumber(amount / 1e24);
  }

  return formatNumber(amount / 1e6);
};

export const formatNumber = (number: number) => {
  if (number >= 1e15) return `${(number / 1e15).toFixed(2)}Z`;
  if (number >= 1e12) return `${(number / 1e12).toFixed(2)}T`;
  if (number >= 1e9) return `${(number / 1e9).toFixed(2)}B`;
  if (number >= 1e6) return `${(number / 1e6).toFixed(2)}M`;
  if (number >= 1e3) return `${(number / 1e3).toFixed(2)}K`;

  return number.toFixed(2);
};
