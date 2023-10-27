import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MetricProps {
  icon?: string
  href?: string
  isAuthor?: boolean
  value: string | number
  title: string
  textStyles?: string
}

export function Metric({
  icon,
  href,
  isAuthor,
  value,
  title,
  textStyles,
}: MetricProps) {
  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <div
      className={cn(
        "flex h-full flex-wrap place-items-end gap-1",
        isAuthor ? "max-lg:hidden" : null
      )}
    >
      {!isAuthor && <Icon className="h-5 min-h-[20px] w-5 min-w-[20px]" />}

      <p
        className={cn(
          "flex h-full items-end gap-1",
          textStyles,
          isAuthor && "gap-2"
        )}
      >
        {isAuthor ? (
          <Link href={`${href}`} className="hover:opacity-50">
            {value}
          </Link>
        ) : (
          value
        )}

        <span
          className={cn(
            "line-clamp-1 flex h-full place-items-end text-[12px] font-normal",
            isAuthor && "opacity-60"
          )}
        >
          {title}
        </span>
      </p>
    </div>
  )
}
