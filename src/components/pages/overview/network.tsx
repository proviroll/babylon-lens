import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTokens } from "@/lib/formatting";
import type { NetworkStats } from "@/types/validator";
import { Box, Coins, Users } from "lucide-react";

interface NetworkStatsProps {
  stats: NetworkStats;
}

export function NetworkStatsCards({ stats }: NetworkStatsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Validator Stats
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalValidators}</div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <Badge
                variant="outline"
                className="justify-center bg-green-50 text-green-700"
              >
                {stats.activeValidators} Active
              </Badge>
              <Badge
                variant="outline"
                className="justify-center bg-red-50 text-red-700"
              >
                {stats.totalValidators - stats.activeValidators} Inactive
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-muted-foreground" />
                Token Economics
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTokens(stats.totalSupply)} BBN
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Community Pool</span>
                <span>{formatTokens(stats.communityPool)} BBN</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Box className="h-4 w-4 text-muted-foreground" />
                Chain Info
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Block {stats.latestHeight}</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Chain ID</span>
                <span>{stats.chainId}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
