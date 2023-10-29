import Link from "next/link"
import { type User } from "next-auth"
import { getServerSession } from "next-auth/next"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButtonHeader } from "@/components/auth/signout-button-header"
import { Icons } from "@/components/icons"
import { NavigationMobile } from "@/components/nav/navigation-mobile"
import { GlobalSearch } from "@/components/search/search-global"
import { ThemeToggle } from "@/components/theme-toggle"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function Header() {
  const session = await getServerSession(authOptions)
  const user = session ? (session.user as User) : null

  return (
    <header className="fixed z-50 flex w-full items-center justify-between gap-5 overflow-hidden bg-customLight-900 p-6 shadow-customDark-300 dark:bg-customDark-200 dark:shadow-none sm:px-12">
      <Link
        href="/"
        className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out hover:text-customOrange-400"
      >
        <Icons.logo className="h-6 w-6" />
        <h2 className="font-spaceGrotesk text-[24px] font-bold leading-[31.2px] text-customDark-100  hover:opacity-50 dark:text-customLight-900 max-sm:hidden">
          {siteConfig.name.split(" ")[0]}{" "}
          <span className="text-customOrange-500">
            {siteConfig.name.split(" ")[1]}
          </span>
        </h2>
      </Link>

      <GlobalSearch />

      <div className="flex items-center justify-center md:gap-1">
        <ThemeToggle />

        <nav className="ml-2">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="transition-all duration-300 ease-in-out hover:opacity-70"
              >
                <Button variant="user" size="icon">
                  <Avatar className="h-full w-full">
                    {session.user?.image && (
                      <AvatarImage
                        src={session.user?.image}
                        alt={session.user?.name ?? "user's profile picture"}
                      />
                    )}
                    <AvatarFallback className="text-xs capitalize">
                      {session.user?.email && session.user.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild disabled>
                    <Link href={`/profile/${user?.id}`}>
                      <Icons.avatar
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild disabled>
                    <Link href="/settings">
                      <Icons.settings
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SignOutButtonHeader />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              aria-label="Sign In"
              href="/signin"
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg border-customLight-700 bg-customDark-300 p-4 text-[14px] font-semibold leading-[15.6px] tracking-wide text-customOrange-500 shadow-none hover:opacity-50 dark:border-customDark-400 lg:py-5"
            >
              Sign In
              <span className="sr-only">Sign In</span>
            </Link>
          )}
        </nav>
        <NavigationMobile />
      </div>
    </header>
  )
}
