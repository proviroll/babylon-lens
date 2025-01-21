import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterState } from "@/types/validator";
import { Search } from "lucide-react";

interface ValidatorFiltersProps {
  counts: {
    all: number;
    active: number;
    inactive: number;
    jailed: number;
  };
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function ValidatorFilters({
  counts,
  filters,
  onFiltersChange,
}: ValidatorFiltersProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-primary dark:text-muted-foreground">
        Network Staking
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search validators..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-9 sm:w-[250px]"
          />
        </div>

        <Select
          value={filters.filter}
          onValueChange={(value: "all" | "jailed" | "active" | "inactive") =>
            onFiltersChange({ ...filters, filter: value })
          }
        >
          <SelectTrigger className="sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
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
    </div>
  );
}
