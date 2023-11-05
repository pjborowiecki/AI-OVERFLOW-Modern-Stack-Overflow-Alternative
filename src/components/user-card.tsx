import Link from "next/link"
import { getTopTagsByUser } from "@/actions/tag"
import { type User } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TagBadge } from "@/components/tag-badge"

interface UserCardProps {
  user: Pick<User, "id" | "email" | "image">
}

export async function UserCard({ user }: UserCardProps) {
  const topTags = await getTopTagsByUser({ userId: user.id })

  return (
    <Card className="w-full border-customLight-800 bg-customLight-900 shadow-light-100 dark:border-customDark-300 dark:bg-customDark-200 dark:shadow-none">
      <CardHeader className="pb-2.5">
        <Link href={`/profile/${user.id}`}>
          <div className="mb-1.5 h-14 w-14 rounded-full text-sm">
            <Avatar className="h-full w-full">
              {user?.image && (
                <AvatarImage
                  src={user.image}
                  alt={`${user.email.split("@")[0]}'s profile picture`}
                />
              )}
              <AvatarFallback className="text-xs capitalize">P</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="w-full truncate text-[16px] font-semibold leading-[26px] text-customDark-200 dark:text-customLight-900">
            {user.email.split("@")[0]}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {topTags && topTags.length > 0 ? (
          topTags.map((tag) => (
            <TagBadge key={tag.id} id={tag.id} name={tag.name} />
          ))
        ) : (
          <Badge className="hover:opacity-100">No interactions yet</Badge>
        )}
      </CardContent>
    </Card>
  )
}
