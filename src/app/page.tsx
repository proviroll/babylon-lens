"use client";

import { MaxWidthContainer } from "@/components/max-width-container";
import { NetworkStatsCards } from "@/components/pages/overview/network";
import { ValidatorDetails } from "@/components/pages/validators/details";
import { ValidatorFilters } from "@/components/pages/validators/filters";
import { ValidatorGrid } from "@/components/pages/validators/grid";
import { ValidatorTable } from "@/components/pages/validators/table";
import { Spinner } from "@/components/ui/spinner";
import { useValidators } from "@/hooks/use-validators";
import { formatTokens, truncateAddress } from "@/lib/formatting";
import { type NetworkStats } from "@/types/validator";

export default function ValidatorsPage() {
  const {
    validators,
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
    networkStats,
  } = useValidators();

  const INITIAL_DISPLAY_COUNT = 10;

  if (isLoading) {
    return (
      <main className="mx-auto my-24 flex flex-col">
        <MaxWidthContainer>
          <div className="flex h-[50vh] items-center justify-center">
            <Spinner className="h-8 w-8 text-primary" />
          </div>
        </MaxWidthContainer>
      </main>
    );
  }

  return (
    <main className="mx-auto my-24 flex flex-col">
      <MaxWidthContainer>
        {networkStats && (
          <NetworkStatsCards stats={networkStats as unknown as NetworkStats} />
        )}
        <ValidatorFilters
          counts={counts}
          filters={{ search, filter, sort }}
          onFiltersChange={(filters) => {
            setSearch(filters.search);
            setFilter(filters.filter);
          }}
        />
        <ValidatorTable
          validators={validators}
          isLoading={isLoading}
          showAll={showAll}
          onShowAllChange={setShowAll}
          onValidatorSelect={setSelectedValidator}
          toggleSort={toggleSort}
          formatTokens={formatTokens}
          truncateAddress={truncateAddress}
          INITIAL_DISPLAY_COUNT={INITIAL_DISPLAY_COUNT}
        />

        <ValidatorDetails
          validator={selectedValidator}
          onClose={() => setSelectedValidator(null)}
          truncateAddress={truncateAddress}
          formatTokens={formatTokens}
        />
        <ValidatorGrid
          validators={validators}
          isLoading={isLoading}
          showAll={showAll}
          onShowAllChange={setShowAll}
          onValidatorSelect={setSelectedValidator}
        />
      </MaxWidthContainer>
    </main>
  );
}
