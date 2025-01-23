import { operatorToConsensusAddress } from "@/lib/address";
import { calculateUptime } from "@/lib/validator";
import { api } from "@/trpc/react";
import type { Validator } from "@/types/validator";
import { useMemo, useState } from "react";

export function useValidators() {
  // Data fetching
  const { data: validatorData, isLoading } = api.validator.getAll.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  const { data: signingData } = api.validator.getSigningInfo.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  const { data: chainInfo } = api.validator.getChainInfo.useQuery();

  // UI state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "jailed" | "active" | "inactive"
  >("all");
  const [sort, setSort] = useState<{
    column: "moniker" | "tokens" | "commission" | "uptime" | null;
    direction: "asc" | "desc";
  }>({ column: null, direction: "asc" });
  const [showAll, setShowAll] = useState(false);
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(
    null,
  );

  // Computed values
  const counts = {
    all: validatorData?.validators.length ?? 0,
    jailed: validatorData?.validators.filter((v) => v.jailed).length ?? 0,
    active:
      validatorData?.validators.filter(
        (v: Validator) => v.status === "BOND_STATUS_BONDED",
      ).length ?? 0,
    inactive:
      validatorData?.validators.filter((v) => v.status !== "BOND_STATUS_BONDED")
        .length ?? 0,
  };
  const validatorsWithUptime = useMemo(() => {
    if (
      !validatorData?.validators ||
      !signingData?.signingInfos ||
      !chainInfo
    ) {
      return [];
    }

    return validatorData.validators.map((validator) => {
      try {
        const consensusAddr = operatorToConsensusAddress(
          validator.operatorAddress,
          validator.consensusPubkey ?? { typeUrl: "", value: "" },
        );
        const signingInfo = signingData.signingInfos.find(
          (info) => info.address === consensusAddr,
        );

        return {
          ...validator,
          signingInfo,
          uptime: signingInfo
            ? calculateUptime(
                signingInfo.startHeight,
                signingInfo.missedBlocksCounter,
                chainInfo.latestHeight,
              )
            : undefined,
        };
      } catch (error) {
        console.error("Error matching validator:", error);
        return {
          ...validator,
          signingInfo: undefined,
          uptime: undefined,
        };
      }
    });
  }, [validatorData, signingData, chainInfo]);

  const filteredValidators = useMemo(() => {
    return validatorsWithUptime.filter((validator) => {
      const statusFilter =
        filter === "all"
          ? true
          : filter === "jailed"
            ? validator.jailed
            : filter === "active"
              ? validator.status === "BOND_STATUS_BONDED"
              : validator.status !== "BOND_STATUS_BONDED";

      const searchFilter = search
        ? validator.description.moniker
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;

      return statusFilter && searchFilter;
    });
  }, [validatorsWithUptime, filter, search]);

  const sortedValidators = useMemo(() => {
    if (!filteredValidators || !sort.column) return filteredValidators;

    return [...filteredValidators].sort((a, b) => {
      const direction = sort.direction === "asc" ? 1 : -1;

      switch (sort.column) {
        case "moniker":
          return (
            direction *
            a.description.moniker.localeCompare(b.description.moniker)
          );
        case "tokens":
          return direction * (Number(a.tokens) - Number(b.tokens));
        case "commission":
          return (
            direction *
            (Number(a.commission.commissionRates.rate) -
              Number(b.commission.commissionRates.rate))
          );
        case "uptime":
          const aUptime = a.uptime ? Number(a.uptime) : -1;
          const bUptime = b.uptime ? Number(b.uptime) : -1;
          return direction * (aUptime - bUptime);
        default:
          return 0;
      }
    });
  }, [filteredValidators, sort]);

  const toggleSort = (column: typeof sort.column) => {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column
          ? prev.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  console.log("Chain Info from API:", chainInfo);

  const stats = chainInfo
    ? {
        totalValidators: counts.all,
        activeValidators: counts.active,
        totalSupply: chainInfo.totalSupply[0]?.amount ?? "0",
        communityPool: chainInfo.communityPool[0]?.amount ?? "0",
        latestHeight: chainInfo.latestHeight,
        chainId: chainInfo.chainId,
      }
    : undefined;
  console.log("Transformed Network Stats:", stats);

  return {
    validators: sortedValidators ?? [],
    isLoading,
    counts,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    toggleSort,
    showAll,
    setShowAll,
    selectedValidator,
    setSelectedValidator,
    networkStats: stats,
  };
}
