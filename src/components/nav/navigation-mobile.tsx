"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  disabled?: boolean
  segment: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  segment,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        href.includes(segment) && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}

export function NavigationMobile() {
  const segment = useSelectedLayoutSegment()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="transition-all duration-300 ease-in-out">
        <Button variant="navbarIcon" size="icon" className="ml-2 sm:hidden">
          <Icons.hamburgerMenu className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col gap-10 transition-all duration-300 ease-in-out"
      >
        <div className="pl-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
            <h2 className="font-spaceGrotesk text-[24px] font-bold leading-[31.2px] text-customDark-100 hover:opacity-50 dark:text-customLight-900">
              {siteConfig.name.split(" ")[0]}{" "}
              <span className="text-customOrange-500">
                {siteConfig.name.split(" ")[1]}
              </span>
            </h2>

            <span className="sr-only">Go to Home Page</span>
          </Link>
        </div>
        <div className="flex flex-col gap-6 pl-16 text-xl font-medium leading-none tracking-wide">
          {siteConfig.navItemsMobile.map((item) => (
            <MobileLink
              key={item.title}
              href={item.href}
              segment={String(segment)}
              setIsOpen={setIsOpen}
            >
              {item.title}
            </MobileLink>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
