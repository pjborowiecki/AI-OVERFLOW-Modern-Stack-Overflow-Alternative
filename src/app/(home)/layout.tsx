import * as React from "react"

import { Header } from "@/components/nav/header"
import { LeftSidebar } from "@/components/nav/sidebar-left"
import { RightSidebar } from "@/components/nav/sidebar-right"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-customLight-850 dark:bg-customDark-100">
      <Header />
      <div className="flex flex-1">
        <LeftSidebar />
        <main className="flex flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <section className="mx-auto w-full max-w-5xl">{children}</section>
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}
