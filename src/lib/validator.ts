import type { Validator } from "@/types/validator";

export const calculateUptime = (
  startHeight: string,
  missedBlocks: string,
  latestHeight: string,
) => {
  const start = Number(startHeight);
  const missed = Number(missedBlocks);
  const latest = Number(latestHeight);

  if (start === 0 || latest === 0) return "0";

  const blocksSinceStart = latest - start;
  if (blocksSinceStart <= 0) return "0";

  const uptime = ((blocksSinceStart - missed) / blocksSinceStart) * 100;
  return uptime.toFixed(2);
};

export const filterValidators = (
  validators: Validator[],
  search: string,
  filter: "all" | "jailed" | "active" | "inactive",
) => {
  return validators?.filter((validator) => {
    // First apply status/jailed filter
    const statusFilter =
      filter === "all"
        ? true
        : filter === "jailed"
          ? validator.jailed
          : filter === "active"
            ? validator.status === "BOND_STATUS_BONDED"
            : validator.status !== "BOND_STATUS_BONDED";

    // Then apply search filter
    const searchFilter = search
      ? validator.description.moniker
          .toLowerCase()
          .includes(search.toLowerCase())
      : true;

    return statusFilter && searchFilter;
  });
};

export const sortValidators = (
  validators: Validator[] | undefined,
  column: "moniker" | "tokens" | "commission" | "uptime" | null,
  direction: "asc" | "desc",
) => {
  if (!validators || !column) return validators;

  return [...validators].sort((a, b) => {
    const dir = direction === "asc" ? 1 : -1;

    switch (column) {
      case "moniker":
        return dir * a.description.moniker.localeCompare(b.description.moniker);
      case "tokens":
        return dir * (Number(a.tokens) - Number(b.tokens));
      case "commission":
        return (
          dir *
          (Number(a.commission.commissionRates.rate) -
            Number(b.commission.commissionRates.rate))
        );
      case "uptime":
        const aUptime = a.uptime ? Number(a.uptime) : -1;
        const bUptime = b.uptime ? Number(b.uptime) : -1;
        return dir * (aUptime - bUptime);
      default:
        return 0;
    }
  });
};
