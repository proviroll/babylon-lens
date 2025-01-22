"use client";
import { MaxWidthContainer } from "@/components/max-width-container";
import { NetworkStatsCards } from "@/components/pages/overview/network";
import { Spinner } from "@/components/ui/spinner";
import { useValidators } from "@/hooks/use-validators";

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
            <NetworkStatsCards stats={networkStats} />
          </div>
        )}
      </MaxWidthContainer>
    </main>
  );
}

