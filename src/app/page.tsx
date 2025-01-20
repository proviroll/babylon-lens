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
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 10;

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

        {/* Table view (large screens) */}
        <div className="hidden lg:block">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[700px] cursor-pointer hover:text-foreground"
                    onClick={() => toggleSort("moniker")}
                  >
                    Validator
                    <ArrowUpDown className="ml-1 inline h-4 w-4" />
                  </TableHead>
                  <TableHead className="w-[300px]">Address</TableHead>
                  <TableHead
                    className="w-[200px] cursor-pointer hover:text-foreground"
                    onClick={() => toggleSort("tokens")}
                  >
                    Tokens
                    <ArrowUpDown className="ml-1 inline h-4 w-4" />
                  </TableHead>

                  <TableHead
                    className="w-[200px] cursor-pointer hover:text-foreground"
                    onClick={() => toggleSort("apy")}
                  >
                    APY
                    <ArrowUpDown className="ml-1 inline h-4 w-4" />
                  </TableHead>
                  <TableHead
                    className="w-[200px] cursor-pointer hover:text-foreground"
                    onClick={() => toggleSort("commission")}
                  >
                    Commission
                    <ArrowUpDown className="ml-1 inline h-4 w-4" />
                  </TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="text-right">Jailed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedValidators
                  ?.slice(0, showAll ? undefined : INITIAL_DISPLAY_COUNT)
                  .map((validator) => (
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
                      <TableCell className="">
                        {formatTokens(validator.tokens)} BBN
                      </TableCell>
                      <TableCell className="text-green-600">
                        {calculateAPY(
                          validator.commission.commissionRates.rate,
                        )}
                        %
                      </TableCell>
                      <TableCell className="">
                        {(
                          Number(validator.commission.commissionRates.rate) /
                          1e16
                        ).toFixed(1)}
                        %
                      </TableCell>
                      <TableCell className="r">
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
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            validator.jailed
                              ? "flex w-24 justify-end bg-red-100 text-red-800"
                              : "flex w-24 justify-end bg-green-100 text-green-800"
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
          {sortedValidators &&
            sortedValidators.length > INITIAL_DISPLAY_COUNT && (
              <div className="mt-4 flex w-full justify-center border border-[1px] border-foreground/10 py-2">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  {showAll
                    ? "Show Less"
                    : `View All (${sortedValidators.length})`}
                </button>
              </div>
            )}
        </div>

        {/* Grid view (small screens) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {sortedValidators
            ?.slice(0, showAll ? undefined : INITIAL_DISPLAY_COUNT)
            .map((validator) => (
              <div
                key={validator.operatorAddress}
                className="rounded-lg border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 text-blue-600">
                      {truncateAddress(validator.operatorAddress)}
                    </div>
                    <CopyButton text={validator.operatorAddress} />
                  </div>
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
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-500">
                    {formatTokens(validator.tokens)} BBN
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-500">
                    {calculateAPY(validator.commission.commissionRates.rate)}%
                    APY
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-500">
                    {(
                      Number(validator.commission.commissionRates.rate) / 1e16
                    ).toFixed(1)}
                    % Commission
                  </span>
                </div>
                <div className="mt-2">
                  <Badge
                    variant="outline"
                    className={
                      validator.jailed
                        ? "flex w-24 justify-end bg-red-100 text-red-800"
                        : "flex w-24 justify-end bg-green-100 text-green-800"
                    }
                  >
                    {validator.jailed ? "Jailed" : "Not Jailed"}
                  </Badge>
                </div>
              </div>
            ))}
          {sortedValidators &&
            sortedValidators.length > INITIAL_DISPLAY_COUNT && (
              <div className="col-span-full mt-4 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="border border-2 border-red-600 text-sm text-blue-500 hover:underline"
                >
                  {showAll
                    ? "Show Less"
                    : `View All (${sortedValidators.length})`}
                </button>
              </div>
            )}
        </div>
      </div>
    </main>
  );
}
