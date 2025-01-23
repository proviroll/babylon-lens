import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import type { Validator } from "@/types/validator";
import { ArrowUpDown, CheckCircle, Copy, XCircle } from "lucide-react";

interface ValidatorTableProps {
  validators: Validator[];
  isLoading: boolean;
  showAll: boolean;
  onShowAllChange: (show: boolean) => void;
  onValidatorSelect: (validator: Validator) => void;
  toggleSort: (
    column: "moniker" | "tokens" | "commission" | "uptime" | null,
  ) => void;
  formatTokens: (tokens: string) => string;
  truncateAddress: (address: string) => string;
  INITIAL_DISPLAY_COUNT: number;
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

export function ValidatorTable({
  validators,
  isLoading,
  showAll,
  onShowAllChange,
  onValidatorSelect,
  toggleSort,
  formatTokens,
  truncateAddress,
  INITIAL_DISPLAY_COUNT,
}: ValidatorTableProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hidden lg:block">
      <div className="rounded-md border bg-card p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[700px] cursor-pointer hover:text-foreground"
                onClick={() => toggleSort("moniker")}
              >
                Validator
                <ArrowUpDown className="ml-1 inline h-3.5 w-3.5" />
              </TableHead>
              <TableHead className="w-[300px]">Address</TableHead>
              <TableHead
                className="w-[250px] cursor-pointer hover:text-foreground"
                onClick={() => toggleSort("tokens")}
              >
                Voting Power
                <ArrowUpDown className="ml-1 inline h-3.5 w-3.5" />
              </TableHead>
              <TableHead
                className="w-[250px] cursor-pointer hover:text-foreground"
                onClick={() => toggleSort("uptime")}
              >
                Uptime
                <ArrowUpDown className="ml-1 inline h-3.5 w-3.5" />
              </TableHead>
              <TableHead
                className="w-[200px] cursor-pointer hover:text-foreground"
                onClick={() => toggleSort("commission")}
              >
                Commission
                <ArrowUpDown className="ml-1 inline h-3.5 w-3.5" />
              </TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="text-right">Jailed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validators
              .slice(0, showAll ? undefined : INITIAL_DISPLAY_COUNT)
              .map((validator) => (
                <TableRow
                  key={validator.operatorAddress}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onValidatorSelect(validator)}
                >
                  <TableCell className="font-medium">
                    {validator.description.moniker}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <div className="flex max-w-sm items-center gap-2 truncate text-sky-400">
                      {truncateAddress(validator.operatorAddress)}
                      <CopyButton text={validator.operatorAddress} />
                    </div>
                  </TableCell>
                  <TableCell className="">
                    {formatTokens(validator.tokens)}
                  </TableCell>
                  <TableCell
                    className={`${
                      !validator.uptime
                        ? "pl-8 text-muted-foreground"
                        : Number(validator.uptime) < 99.98
                          ? "text-red-500"
                          : "text-teal-600"
                    }`}
                  >
                    {validator.uptime ? `${validator.uptime}%` : "-"}
                  </TableCell>
                  <TableCell className="">
                    {(
                      Number(validator.commission.commissionRates.rate) / 1e16
                    ).toFixed(1)}
                    %
                  </TableCell>
                  <TableCell className="">
                    <Badge
                      variant="outline"
                      className={
                        validator.status === "BOND_STATUS_BONDED"
                          ? "w-24 bg-teal-400 text-teal-800"
                          : "w-24 bg-red-200 text-red-800"
                      }
                    >
                      {validator.status === "BOND_STATUS_BONDED" ? (
                        <>
                          <CheckCircle className="mr-1 inline-block h-3.5 w-3.5" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-1 inline-block h-3.5 w-3.5" />
                          Inactive
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        validator.jailed
                          ? "flex w-24 justify-end bg-red-200 text-red-800"
                          : "flex w-24 justify-end bg-teal-400 text-green-800"
                      }
                    >
                      {validator.jailed ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {validators.length > INITIAL_DISPLAY_COUNT && (
        <div className="mt-4 flex w-full justify-center border border-[1px] border-foreground/10 bg-card py-2">
          <button
            onClick={() => onShowAllChange(!showAll)}
            className="text-sm text-primary hover:underline dark:text-muted-foreground"
          >
            {showAll ? "Show Less" : `View All (${validators.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
