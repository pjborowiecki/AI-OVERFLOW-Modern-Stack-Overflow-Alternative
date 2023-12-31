import Link from "next/link"

import { Badge } from "@/components/ui/badge"

interface TagBadgeProps {
  id: string
  name: string
  totalQuestions?: number
  showCount?: boolean
}

export function TagBadge({
  id,
  name,
  totalQuestions,
  showCount,
}: TagBadgeProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Link href={`/tags/${id}`}>
        <Badge>{name}</Badge>
      </Link>
      {showCount && (
        <span className="text-[12px] font-medium leading-[15.6px] text-customDark-500 dark:text-customLight-700">
          {totalQuestions}
        </span>
      )}
    </div>
  )
}
