"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function SignOutButton() {
  return (
    <Button
      aria-label="Sign Out"
      className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg border-customLight-700 bg-customLight-700 p-4 text-[14px] font-semibold leading-[15.6px] tracking-wide text-customDark-400 shadow-none hover:opacity-50 dark:border-customDark-400 dark:bg-customDark-300 dark:text-customLight-900 lg:py-5"
      onClick={() =>
        void signOut({
          callbackUrl: "/",
          redirect: true,
        })
      }
    >
      <Icons.login
        className="h-5 w-5 invert dark:invert-0 lg:hidden"
        aria-hidden="true"
      />
      <span className="primary-text-gradient max-lg:hidden">Sign Out</span>
    </Button>
  )
}
