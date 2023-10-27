import Link from "next/link"
import type { User } from "@prisma/client"
import { getServerSession } from "next-auth"

import { SidebarNavigation } from "@/components/nav/navigation-sidebar"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { SignOutButton } from "../auth/signout-button"
import { Icons } from "../icons"

export async function LeftSidebar() {
  const session = await getServerSession(authOptions)
  const user = session ? (session.user as User) : null

  return (
    <aside className="custom-scrollbar sticky left-0 top-0 flex flex-col justify-between overflow-hidden overflow-y-auto border-r border-customLight-800 bg-customLight-900 p-6 pt-36 shadow-customDark-300  dark:border-customDark-300 dark:bg-customDark-200 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <SidebarNavigation userId={user?.id} />

      {session ? (
        <SignOutButton />
      ) : (
        <Link
          href="/signin"
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg border-customLight-700 bg-customDark-300 p-4 text-[14px] font-semibold leading-[15.6px] tracking-wide text-customDark-400 shadow-none hover:opacity-50 dark:border-customDark-400 dark:text-customLight-900 lg:py-5"
        >
          <Icons.login
            className="h-5 w-5 invert dark:invert-0 lg:hidden"
            aria-hidden="true"
          />
          <span className="primary-text-gradient max-lg:hidden">Sign In</span>
        </Link>
      )}
    </aside>
  )
}
