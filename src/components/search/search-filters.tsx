"use client"

import { type SearchFilter } from "@/types"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchFiltersProps {
  filters: SearchFilter[]
  otherClasses?: string
  containerClasses?: string
}

export function SearchFilters({
  filters,
  otherClasses,
  containerClasses,
}: SearchFiltersProps) {
  return (
    <div className={cn("relative", containerClasses)}>
      <Select>
        <SelectTrigger className={cn("", otherClasses)}>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
