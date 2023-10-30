import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

interface LocalSearchProps {
  route: string
  iconPosition: "left" | "right"
  placeholder: string
  additionalClasses?: string
}

export function LocalSearch({
  route,
  iconPosition,
  placeholder,
  additionalClasses,
}: LocalSearchProps) {
  return (
    <div
      className={cn(
        "dark:dark-gradient flex min-h-[56px] w-full grow items-center gap-2 rounded-lg bg-customLight-800 px-4",
        additionalClasses
      )}
    >
      {iconPosition === "left" && (
        <Icons.search className="h-6 min-h-[24px] w-6 min-w-[24px] cursor-pointer" />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        className="border-none bg-transparent text-[16px] font-normal leading-[22.4px] shadow-none outline-none placeholder:text-customLight-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:placeholder:text-customLight-500"
      />
      {iconPosition === "right" && (
        <Icons.search className="h-6 min-h-[24px] w-6 min-w-[24px] cursor-pointer" />
      )}
    </div>
  )
}
