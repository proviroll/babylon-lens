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
import { ArrowUpDown, CheckCircle, Copy, Search, XCircle } from "lucide-react";
import { useState } from "react";

const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "jailed" | "active" | "inactive"
  >("all");
  const [sort, setSort] = useState<{
    column: "moniker" | "tokens" | "commission" | "apy" | null;
    direction: "asc" | "desc";
  }>({ column: null, direction: "asc" });

  const { data: validatorData, isLoading } = api.validator.getAll.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

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
    // First apply status/jailed filter
    const statusFilter =
      filter === "all"
        ? true
        : filter === "jailed"
          ? validator.jailed
          : filter === "active"
            ? validator.status === "BOND_STATUS_BONDED"
            : validator.status !== "BOND_STATUS_BONDED";

    // Then apply search filter
    const searchFilter = search
      ? validator.description.moniker
          .toLowerCase()
          .includes(search.toLowerCase())
      : true;

    return statusFilter && searchFilter;
  });

  const sortValidators = (validators: typeof filteredValidators) => {
    if (!validators || !sort.column) return validators;

    return [...validators].sort((a, b) => {
      const direction = sort.direction === "asc" ? 1 : -1;

      switch (sort.column) {
        case "moniker":
          return (
            direction *
            a.description.moniker.localeCompare(b.description.moniker)
          );
        case "tokens":
          return direction * (Number(a.tokens) - Number(b.tokens));
        case "commission":
          return (
            direction *
            (Number(a.commission.commissionRates.rate) -
              Number(b.commission.commissionRates.rate))
          );
        case "apy":
          return (
            direction *
            (Number(calculateAPY(a.commission.commissionRates.rate)) -
              Number(calculateAPY(b.commission.commissionRates.rate)))
          );
        default:
          return 0;
      }
    });
  };

  const sortedValidators = sortValidators(filteredValidators);

  const toggleSort = (column: typeof sort.column) => {
    if (sort.column === column) {
      setSort((prev) => ({
        ...prev,
        direction: prev.direction === "asc" ? "desc" : "asc",
      }));
    } else {
      setSort({ column, direction: "asc" });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="mx-auto my-48 flex min-h-screen max-w-6xl flex-col">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Network Staking</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search validators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 rounded-md border border-input py-1 pl-9 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Select
              value={filter}
              onValueChange={(value: typeof filter) => setFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter validators" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Validators ({counts.all})
                </SelectItem>
                <SelectItem value="active">Active ({counts.active})</SelectItem>
                <SelectItem value="inactive">
                  Inactive ({counts.inactive})
                </SelectItem>
                <SelectItem value="jailed">Jailed ({counts.jailed})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => toggleSort("moniker")}
                >
                  Validator
                  <ArrowUpDown className="ml-1 inline h-4 w-4" />
                </TableHead>
                <TableHead className="w-full max-w-sm">Address</TableHead>
                <TableHead
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => toggleSort("tokens")}
                >
                  Tokens
                  <ArrowUpDown className="ml-1 inline h-4 w-4" />
                </TableHead>

                <TableHead
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => toggleSort("apy")}
                >
                  APY
                  <ArrowUpDown className="ml-1 inline h-4 w-4" />
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => toggleSort("commission")}
                >
                  Commission
                  <ArrowUpDown className="ml-1 inline h-4 w-4" />
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jailed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedValidators?.map((validator) => (
                <TableRow key={validator.operatorAddress}>
                  <TableCell className="font-medium">
                    {validator.description.moniker}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <div className="flex max-w-sm items-center gap-2 truncate text-blue-600">
                      {truncateAddress(validator.operatorAddress)}
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
                          ? "w-24 bg-green-100 text-green-800"
                          : "w-24 bg-red-100 text-red-800"
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
                          ? "w-24 bg-red-100 text-red-800"
                          : "w-24 bg-green-100 text-green-800"
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
