"use client"

import { homePageFilters } from "@/data/filters"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function SearchFiltersAlt() {
  const active = "newest"

  return (
    <div className="hidden flex-wrap gap-3 md:flex">
      {homePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => {}}
          className={cn(
            "rounded-lg bg-customLight-800 px-6 py-3 text-[14px] font-medium capitalize leading-[18.2px] text-customLight-500 shadow-none hover:opacity-80 dark:bg-customDark-300",
            active === filter.value &&
              "bg-customOrange-100 text-customOrange-500"
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  )
}
