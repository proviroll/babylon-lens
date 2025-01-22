import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import type { Validator } from "@/types/validator";
import { Copy } from "lucide-react";

interface ValidatorDetailsProps {
  validator: Validator | null;
  onClose: () => void;
  truncateAddress: (address: string) => string;
  formatTokens: (tokens: string) => string;
  calculateAPY: (commission: string) => string;
}

const CopyButton = ({ text }: { text: string }) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Address copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 p-0"
      onClick={handleCopy}
    >
      <Copy className="h-3.5 w-3.5 text-foreground/30" />
    </Button>
  );
};

export function ValidatorDetails({
  validator,
  onClose,
  truncateAddress,
  formatTokens,
  calculateAPY,
}: ValidatorDetailsProps) {
  return (
    <Sheet open={!!validator} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{validator?.description.moniker}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Operator Address
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-sm text-sky-400">
                {truncateAddress(validator?.operatorAddress ?? "")}
              </span>
              {validator && <CopyButton text={validator.operatorAddress} />}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Description
            </h3>
            <p className="mt-1 text-sm">
              {validator?.description.details ?? "No description provided"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Website
            </h3>
            <a
              href={validator?.description.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-sm text-sky-400 hover:underline"
            >
              {validator?.description.website ?? "No website provided"}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Tokens
              </h3>
              <p className="mt-1 text-sm">
                {validator && formatTokens(validator.tokens)} BBN
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Commission
              </h3>
              <p className="mt-1 text-sm">
                {validator &&
                  (
                    Number(validator.commission.commissionRates.rate) / 1e16
                  ).toFixed(1)}
                %
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Uptime
              </h3>
              <p
                className={`mt-1 text-sm ${
                  !validator?.uptime
                    ? ""
                    : Number(validator.uptime) < 99.98
                      ? "text-red-500"
                      : "text-teal-400"
                }`}
              >
                {validator?.uptime ? `${validator.uptime}%` : "-"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <Badge
                className={`mt-1 ${
                  validator?.status === "BOND_STATUS_BONDED"
                    ? "bg-teal-400 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {validator?.status === "BOND_STATUS_BONDED"
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Max Rate
              </h3>
              <p className="mt-1 text-sm">
                {validator &&
                  (
                    Number(validator.commission.commissionRates.maxRate) / 1e16
                  ).toFixed(1)}
                %
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Max Change Rate
              </h3>
              <p className="mt-1 text-sm">
                {validator &&
                  (
                    Number(validator.commission.commissionRates.maxChangeRate) /
                    1e16
                  ).toFixed(1)}
                %
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Last Commission Update
              </h3>
              <p className="mt-1 text-sm">
                {validator?.commission.updateTime?.seconds
                  ? new Date(
                      Number(validator.commission.updateTime.seconds) * 1000,
                    ).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Start Height
              </h3>
              <div className="mt-1 font-mono">
                {validator?.signingInfo?.startHeight ?? "-"}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Missed Blocks
              </h3>
              <div
                className={`mt-1 text-sm ${
                  validator?.uptime && Number(validator.uptime) < 99.98
                    ? "text-red-500"
                    : ""
                }`}
              >
                {validator?.signingInfo?.missedBlocksCounter ?? "-"}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
