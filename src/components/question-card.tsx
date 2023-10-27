import Link from "next/link"

import { formatCount, formatDate } from "@/lib/utils"
import { Metric } from "@/components/metric"
import { Tag } from "@/components/tag"

// TODO: Update this to use the new question type
interface QuestionCardProps {
  question: any
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="dark:dark-gradient flex flex-col rounded-lg bg-customLight-900 p-9 shadow-customDark-100 dark:shadow-none dark:shadow-customDark-100 sm:px-11">
      <div className="mb-1.5 line-clamp-1 flex items-center gap-1 text-[10px] font-normal leading-[13px] text-customDark-400 dark:text-customLight-700 lg:hidden">
        <Link
          href={`/profile/${question.user.id}`}
          className="hover:opacity-60"
        >
          {question.user.name}
        </Link>

        <span className="ml-2 opacity-60">
          {formatDate(question.createdAt)}
        </span>
      </div>
      <div className="mb-3 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
        <Link href={`/question/${question.id}`}>
          <h3 className="line-clamp-1 flex-1 text-[18px] font-semibold leading-[25.2px] text-customDark-200 hover:opacity-60 dark:text-customLight-900 sm:text-[20px] sm:leading-[24.8px]">
            {question.title}
          </h3>
        </Link>
      </div>

      {/* When signed in, show add edit delete actions */}

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <Tag key={tag.id} id={tag.id} name={tag.name} />
          ))}
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <Metric
            isAuthor
            value={question.user.username}
            title={formatDate(question.createdAt)}
            href={`/profile/${question.user.id}`}
            textStyles="text-[14px] font-medium text-customDark-400 dark:text-customLight-800"
          />

          <div className="flex items-center gap-6">
            <Metric
              icon="like"
              value={formatCount(question.upvotes)}
              title="Votes"
              textStyles="text-[12px] font-medium text-customDark-400 dark:text-customLight-800"
            />

            <Metric
              icon="message"
              value={formatCount(question.answers.length)}
              title="Answers"
              textStyles="text-[12px] font-medium text-customDark-400 dark:text-customLight-800"
            />

            <Metric
              icon="views"
              value={formatCount(question.upvotes)}
              title="Views"
              textStyles="text-[12px] font-medium text-customDark-400 dark:text-customLight-800"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
