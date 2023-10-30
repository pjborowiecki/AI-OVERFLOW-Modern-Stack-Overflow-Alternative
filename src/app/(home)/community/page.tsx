import Link from "next/link"
import { getAllUsers } from "@/actions/user"
import { memberFilters } from "@/data/filters"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SearchFilters } from "@/components/search/search-filters"
import { LocalSearch } from "@/components/search/search-local"
import { UserCard } from "@/components/user-card"

export default async function CommunityPage() {
  const users = await getAllUsers({})

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-customDark-100 dark:text-customLight-900">
        All Users
      </h1>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          placeholder="Meet some incredible people"
          additionalClasses="flex-1"
        />
        <SearchFilters
          filters={memberFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {users && users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="mx-auto max-w-4xl text-center text-[16px] font-normal leading-[22.4px] text-customDark-200 dark:text-customLight-800">
            <p className="my-4">No users yet</p>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "p-6 text-[16px] font-bold tracking-wide text-customBlue"
              )}
            >
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
