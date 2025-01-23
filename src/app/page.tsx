"use client";
import { MaxWidthContainer } from "@/components/max-width-container";
import { NetworkStatsCards } from "@/components/pages/overview/network";
import { Spinner } from "@/components/ui/spinner";
import { useValidators } from "@/hooks/use-validators";
import type { Coin } from "@/types/validator";

export default function Home() {
  const { isLoading, networkStats } = useValidators();

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
          <div className="mb-6">
            {/* ! TODO: fix typing */}
            <NetworkStatsCards
              stats={{
                ...networkStats,
                totalSupply: networkStats.totalSupply as unknown as Coin[],
                communityPool: networkStats.communityPool as unknown as Coin[],
              }}
            />
          </div>
        )}
      </MaxWidthContainer>
    </main>
  );
}

