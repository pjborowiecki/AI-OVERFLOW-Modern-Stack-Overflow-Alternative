import Link from "next/link"
import { getServerSession } from "next-auth/next"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton } from "@/components/auth/signout-button"
import { Icons } from "@/components/icons"
import { Navigation } from "@/components/nav/navigation"
import { NavigationMobile } from "@/components/nav/navigation-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full border-b bg-background">
      <div className="container flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out hover:text-customOrange-400"
        >
          <Icons.rocket className="h-6 w-6 text-customOrange-400" />
          <span className="hidden md:flex">{siteConfig.name}</span>
        </Link>
        <Navigation navItems={siteConfig.navItems} />
        <div className="flex items-center justify-center md:gap-1">
          <ThemeToggle />
          <NavigationMobile navItems={siteConfig.navItems} />

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
                      <Link href="/dashboard/account">
                        <Icons.avatar
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
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
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                aria-label="Get started"
                href="/signup"
                className={cn(
                  buttonVariants(),
                  "primary-gradient rounded-full font-semibold text-customDark-200"
                )}
              >
                Get Started
                <span className="sr-only">Get Started</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
