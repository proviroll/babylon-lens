import { bech32 } from "bech32";

export const operatorToConsensusAddress = (operatorAddr: string): string => {
  try {
    console.log("Converting address:", {
      input: operatorAddr,
    });

    // Decode the operator address
    const decoded = bech32.decode(operatorAddr);
    console.log("Decoded address:", {
      prefix: decoded.prefix,
      words: decoded.words,
    });

    // Convert to consensus address by re-encoding with bbnvalcons prefix
    const words = decoded.words;
    const consensusAddr = bech32.encode("bbnvalcons", words);

    console.log("Conversion result:", {
      input: operatorAddr,
      output: consensusAddr,
    });

    return consensusAddr;
  } catch (error) {
    console.error("Error in address conversion:", error);
    return "";
  }
};
