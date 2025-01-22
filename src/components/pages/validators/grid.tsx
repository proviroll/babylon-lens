import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTokens, truncateAddress } from "@/lib/formatting";
import type { Validator } from "@/types/validator";

interface ValidatorGridProps {
  validators: Validator[];
  isLoading: boolean;
  showAll: boolean;
  onShowAllChange: (show: boolean) => void;
}

export function ValidatorGrid({
  validators,
  isLoading,
  showAll,
  onShowAllChange,
}: ValidatorGridProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {validators.map((validator) => (
          <Card key={validator.operatorAddress} className="">
            <CardHeader>
              <CardTitle className="text-lg">
                {validator.description.moniker}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {truncateAddress(validator.operatorAddress)}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tokens</span>
                <span>{formatTokens(validator.tokens)} BBN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Commission</span>
                <span>
                  {(
                    (Number(validator.commission.commissionRates.rate) / 1e18) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uptime</span>
                <span
                  className={`${
                    validator.uptime && Number(validator.uptime) < 99.98
                      ? "text-red-500"
                      : "text-teal-600"
                  }`}
                >
                  {validator.uptime ? `${validator.uptime}%` : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={`${
                    validator.jailed
                      ? "text-red-500"
                      : validator.status === "BOND_STATUS_BONDED"
                        ? "text-teal-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {validator.jailed
                    ? "Jailed"
                    : validator.status === "BOND_STATUS_BONDED"
                      ? "Active"
                      : "Inactive"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center lg:hidden">
        <Button variant="outline" onClick={() => onShowAllChange(!showAll)}>
          {showAll ? "Show Less" : "Show All"}
        </Button>
      </div>
    </div>
  );
}
