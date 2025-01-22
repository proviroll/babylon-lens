import { bech32 } from "bech32";
import { createHash } from "crypto";

export const operatorToConsensusAddress = (
  operatorAddr: string,
  consensusPubkey: { typeUrl: string; value: string },
): string => {
  try {
    if (!consensusPubkey || !consensusPubkey.value) {
      console.error("Missing consensus pubkey");
      return "";
    }

    // Decode the base64 pubkey
    const pubkeyBytes = Buffer.from(consensusPubkey.value, "base64");

    // The actual key is in a protobuf format, we need to skip the first 2 bytes
    const keyBytes = pubkeyBytes.slice(2);

    // Take the SHA256 hash of the public key
    const hash = createHash("sha256").update(keyBytes).digest();

    // Take the first 20 bytes of the hash
    const address = hash.slice(0, 20);

    // Encode with the consensus prefix
    const consensusAddr = bech32.encode("bbnvalcons", bech32.toWords(address));

    return consensusAddr;
  } catch (error) {
    console.error("Error in address conversion:", error);
    return "";
  }
};
