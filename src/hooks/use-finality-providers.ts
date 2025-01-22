import { api } from "@/trpc/react";

export function useFinalityProviders() {
  const { data, isLoading } = api.finality.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const providers = data?.providers ?? [];
  const activeProviders = providers.length;

  return {
    providers,
    isLoading,
    stats: {
      total: activeProviders,
      active: activeProviders,
    },
  };
}
