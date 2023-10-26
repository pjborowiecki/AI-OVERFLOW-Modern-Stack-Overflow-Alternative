"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function SignOutButtonHeader() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() =>
        void signOut({
          callbackUrl: "/",
          redirect: true,
        })
      }
      className="flex w-full items-center justify-start gap-1.5 rounded-none text-sm"
    >
      <Icons.logout className="h-3.5 w-3.5" />
      Sign Out
    </Button>
  )
}
