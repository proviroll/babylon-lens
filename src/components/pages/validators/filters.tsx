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
    <div className="mb-8 space-y-4 sm:space-y-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary dark:text-muted-foreground sm:text-3xl">
          Validators
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search validators..."
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="w-[250px] pl-9"
            />
          </div>
          <Select
            value={filters.filter}
            onValueChange={(value: "all" | "jailed" | "active" | "inactive") =>
              onFiltersChange({ ...filters, filter: value })
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({counts.all})</SelectItem>
              <SelectItem value="active">Active ({counts.active})</SelectItem>
              <SelectItem value="inactive">
                Inactive ({counts.inactive})
              </SelectItem>
              <SelectItem value="jailed">Jailed ({counts.jailed})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative sm:hidden">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search validators..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className="w-full pl-9"
        />
      </div>
    </div>
  );
}
