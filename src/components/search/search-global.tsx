import { Icons } from "@/components/icons"

import { Input } from "../ui/input"

export function GlobalSearch() {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="dark:dark-gradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl bg-customLight-800 px-4">
        <Icons.search className="h-6 min-h-[24px] w-6 min-w-[24px]" />
        <Input
          type="text"
          placeholder="Search globally"
          // value=""
          className="border-none bg-transparent text-[16px] font-normal leading-[22.rpx] shadow-none outline-none placeholder:text-customLight-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:placeholder:text-customLight-500"
        />
      </div>
    </div>
  )
}
