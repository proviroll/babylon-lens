"use client";

import { MaxWidthContainer } from "@/components/max-width-container";
import { FinalityProvidersList } from "@/components/pages/finality-providers/table";
import { useFinalityProviders } from "@/hooks/use-finality-providers";

export default function FinalityPage() {
  const { providers, isLoading } = useFinalityProviders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mx-auto my-24 flex flex-col">
      <MaxWidthContainer>
        <h1 className="text-3xl font-bold">Finality Providers</h1>
        <FinalityProvidersList providers={providers} />
      </MaxWidthContainer>
    </main>
  );
}
