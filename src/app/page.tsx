"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import { ArrowUpDown, CheckCircle, Copy, XCircle } from "lucide-react";
import { useState } from "react";

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
      <Copy className="h-4 w-4" />
    </Button>
  );
};

export default function Home() {
  const { data: validatorData, isLoading } = api.validator.getAll.useQuery();
  const [filter, setFilter] = useState<
    "all" | "jailed" | "active" | "inactive"
  >("all");

  // Calculate counts for each filter
  const counts = {
    all: validatorData?.validators.length ?? 0,
    jailed: validatorData?.validators.filter((v) => v.jailed).length ?? 0,
    active:
      validatorData?.validators.filter((v) => v.status === "BOND_STATUS_BONDED")
        .length ?? 0,
    inactive:
      validatorData?.validators.filter((v) => v.status !== "BOND_STATUS_BONDED")
        .length ?? 0,
  };

  const formatTokens = (tokens: string) => {
    const amount = Number(tokens) / 1e6;
    return new Intl.NumberFormat("en-US").format(amount);
  };

  const calculateAPY = (commission: string) => {
    const rate = Number(commission) / 1e18;
    return ((1 - rate) * 0.12 * 100).toFixed(2);
  };

  const filteredValidators = validatorData?.validators.filter((validator) => {
    switch (filter) {
      case "jailed":
        return validator.jailed;
      case "active":
        return validator.status === "BOND_STATUS_BONDED";
      case "inactive":
        return validator.status !== "BOND_STATUS_BONDED";
      default:
        return true;
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="mx-auto my-48 flex min-h-screen max-w-6xl flex-col">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Network Staking</h1>
          <Select
            value={filter}
            onValueChange={(value: typeof filter) => setFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter validators" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Validators ({counts.all})</SelectItem>
              <SelectItem value="active">Active ({counts.active})</SelectItem>
              <SelectItem value="inactive">
                Inactive ({counts.inactive})
              </SelectItem>
              <SelectItem value="jailed">Jailed ({counts.jailed})</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  Validator
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">
                  Total Stake
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead className="text-right">
                  APY
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead className="text-right">
                  Fee
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Jailed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredValidators?.map((validator) => (
                <TableRow key={validator.operatorAddress}>
                  <TableCell className="font-medium">
                    {validator.description.moniker}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2 truncate text-blue-600">
                      {validator.operatorAddress}
                      <CopyButton text={validator.operatorAddress} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatTokens(validator.tokens)} BBN
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {calculateAPY(validator.commission.commissionRates.rate)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {(
                      Number(validator.commission.commissionRates.rate) / 1e16
                    ).toFixed(1)}
                    %
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        validator.status === "BOND_STATUS_BONDED"
                          ? "w-20 bg-green-100 text-green-800"
                          : "w-20 bg-red-100 text-red-800"
                      }
                    >
                      {validator.status === "BOND_STATUS_BONDED" ? (
                        <>
                          <CheckCircle className="mr-1 inline-block h-4 w-4" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-1 inline-block h-4 w-4" />
                          Inactive
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={
                        validator.jailed
                          ? "w-20 bg-red-100 text-red-800"
                          : "w-20 bg-green-300 text-green-800"
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
      </div>
    </main>
  );
}
