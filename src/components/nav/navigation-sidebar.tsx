"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type NavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface SidebarNavigationProps {
  userId?: string | null
}

export function SidebarNavigation({ userId }: SidebarNavigationProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-1 flex-col gap-3">
      {siteConfig.navItemsSidebar.map((item: NavItem) => {
        const Icon = Icons[item.icon as keyof typeof Icons]

        return (
          <Link
            key={item.title}
            href={
              item.href === "/profile" ? `${item.href}/${userId}` : item.href
            }
            className={cn(
              "flex items-center justify-start gap-4 rounded-lg bg-transparent p-4 hover:bg-customLight-700 dark:hover:bg-customDark-300",
              pathname === item.href
                ? "primary-gradient text-customLight-900"
                : "text-customDark-400 dark:text-customLight-900"
            )}
          >
            <Icon
              className={cn(
                "h-5 min-h-[20px] w-5 min-w-[20px]",
                item.href ? "" : "invert dark:invert-0"
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "text-[18px] font-medium leading-[25.2px] max-lg:hidden",
                item.href && "font-bold leading-[140%]"
              )}
            >
              {item.title}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
