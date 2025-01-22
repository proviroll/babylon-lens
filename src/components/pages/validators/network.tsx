import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTokens } from "@/lib/formatting";
import type { NetworkStats } from "@/types/validator";

interface NetworkStatsProps {
  stats: NetworkStats;
}

export function NetworkStatsCards({ stats }: NetworkStatsProps) {
  console.log("NetworkStatsCards rendered with stats:", stats);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Validators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalValidators}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeValidators} Active
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Supply</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatTokens(stats.totalSupply)} BBN
          </div>
          <p className="text-xs text-muted-foreground">
            Community Pool: {formatTokens(stats.communityPool)} BBN
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chain Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Block {stats.latestHeight}</div>
          <p className="text-xs text-muted-foreground">{stats.chainId}</p>
        </CardContent>
      </Card>
    </div>
  );
}
