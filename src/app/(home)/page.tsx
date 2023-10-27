import Link from "next/link"
import { sampleQuestions } from "@/data"
import { homePageFilters } from "@/data/filters"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { QuestionCard } from "@/components/question-card"
import { NoResults } from "@/components/search/no-results"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchFiltersAlt } from "@/components/search/search-filters-alt"
import { LocalSearch } from "@/components/search/search-local"

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-customDark-100 dark:text-customLight-900">
          All Questions
        </h1>
        <Link
          href="/ask-question"
          className={cn(
            buttonVariants(),
            "primary-gradient flex min-h-[46px] justify-end px-4 py-3 !text-customLight-900 hover:opacity-50 max-sm:w-full"
          )}
        >
          Ask a Question
        </Link>
      </div>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          placeholder="Search questions"
          additionalClasses="flex-1"
        />
        <SearchFilters
          filters={homePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <SearchFiltersAlt />

      <div className="mt-8 flex w-full flex-col gap-6">
        {sampleQuestions.length > 0 ? (
          sampleQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <NoResults
            title="There are no questions yet"
            description="Be the first to break the silence! Ask a question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved!"
            linkHref="/ask-question"
            linkText="Ask a Question"
          />
        )}
      </div>
    </div>
  )
}
