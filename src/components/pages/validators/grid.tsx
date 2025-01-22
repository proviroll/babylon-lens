import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTokens, truncateAddress } from "@/lib/formatting";
import type { Validator } from "@/types/validator";

interface ValidatorGridProps {
  validators: Validator[];
  isLoading: boolean;
  showAll: boolean;
  onShowAllChange: (show: boolean) => void;
  onValidatorSelect: (validator: Validator) => void;
}

export function ValidatorGrid({
  validators,
  isLoading,
  showAll,
  onShowAllChange,
  onValidatorSelect,
}: ValidatorGridProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {validators.slice(0, showAll ? undefined : 10).map((validator) => (
          <Card
            key={validator.operatorAddress}
            className="cursor-pointer transition-colors hover:bg-muted/50"
            onClick={() => onValidatorSelect(validator)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {validator.description.moniker}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-sky-400">
                <span className="font-mono">
                  {truncateAddress(validator.operatorAddress)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tokens</span>
                <span className="text-sm">
                  {formatTokens(validator.tokens)} BBN
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Commission
                </span>
                <span className="text-sm">
                  {(
                    Number(validator.commission.commissionRates.rate) / 1e16
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span
                  className={`text-sm ${
                    validator.uptime && Number(validator.uptime) < 99.98
                      ? "text-red-500"
                      : "text-teal-600"
                  }`}
                >
                  {validator.uptime ? `${validator.uptime}%` : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span
                  className={`text-sm ${
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
