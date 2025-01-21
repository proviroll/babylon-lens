export const operatorToConsensusAddress = (operatorAddr: string): string => {
  try {
    // For now, just log the conversion attempt
    console.log("Validator details:", {
      operatorAddr,
    });
    return "";
  } catch (error) {
    console.error("Error in address conversion:", error);
    return "";
  }
};
