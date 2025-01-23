import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatTokens } from "@/lib/formatting";
import type { NetworkStats } from "@/types/validator";
import { Box, Coins, Users } from "lucide-react";

interface NetworkStatsProps {
  stats: NetworkStats;
}

export function NetworkStatsCards({ stats }: NetworkStatsProps) {
  return (
    <div className="mb-24">
      <h2 className="mb-8 text-3xl font-bold text-primary dark:text-muted-foreground">
        Network Stats
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Active Validators
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {stats.activeValidators}{" "}
                <span className="text-xl font-light text-muted-foreground">
                  out of
                </span>{" "}
                {stats.totalValidators}
              </div>
              <div className="text-lg font-medium text-muted-foreground">
                {(
                  (stats.activeValidators / stats.totalValidators) *
                  100
                ).toFixed(1)}
                %
              </div>
            </div>
            <div className="mt-2">
              <Progress
                value={(stats.activeValidators / stats.totalValidators) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-muted-foreground" />
                Token Economics
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Supply
                </span>
                <span className="text-sm font-medium">
                  {formatTokens(
                    stats.totalSupply[0]?.amount ?? "0",
                    "tbaby-supply",
                  )}{" "}
                  TBABY
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Community Pool
                </span>
                <span className="text-sm font-medium">
                  {formatTokens(
                    stats.communityPool[0]?.amount ?? "0",
                    "tbaby-pool",
                  )}{" "}
                  TBABY
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              <div className="flex items-center gap-2">
                <Box className="h-4 w-4 text-muted-foreground" />
                Chain Info
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Latest Block
                </span>
                <span className="text-sm font-medium">
                  {stats.latestHeight}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Chain ID</span>
                <span className="text-sm font-medium">{stats.chainId}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
