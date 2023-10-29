import Link from "next/link"
import { hotQuestions, popularTags } from "@/data"

import { Icons } from "@/components/icons"
import { TagBadge } from "@/components/tag-badge"

export function RightSidebar() {
  return (
    <aside className="custom-scrollbar sticky right-0 top-0 flex w-[350px] flex-col gap-16 overflow-y-auto border-l border-customLight-800 bg-customLight-900 p-6 pt-36 shadow-customDark-300 dark:border-customDark-300 dark:bg-customDark-200 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="text-[20px] font-bold leading-[26px] text-customDark-200 dark:text-customLight-900">
          Top Questions
        </h3>
        <div className="mt-7 flex w-full flex-col gap-7">
          {hotQuestions.map((question) => (
            <Link
              key={question.id}
              href={`/questions/${question.id}`}
              className="flex cursor-pointer items-center justify-between gap-6 hover:opacity-50"
            >
              <p className="text-[14px] font-medium leading-[18.2px] text-customDark-500 dark:text-customLight-700">
                {question.title}
              </p>
              <Icons.chevronRight className="h-5 min-h-[20px] w-5 min-w-[20px] invert dark:invert-0" />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-[20px] font-bold leading-[26px] text-customDark-200 dark:text-customLight-900">
          Popular Tags
        </h3>
        <div className="mt-7 flex w-full flex-col gap-3">
          {popularTags.map((tag) => (
            <TagBadge
              key={tag.id}
              id={tag.id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
