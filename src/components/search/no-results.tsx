import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface NoResultsProps {
  title: string
  description: string
  linkHref: string
  linkText: string
}

export function NoResults({
  title,
  description,
  linkHref,
  linkText,
}: NoResultsProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 py-8 sm:py-16 md:py-32">
      <Image
        src="/assets/images/light-illustration.png"
        width={270}
        height={200}
        alt="No results found illustration"
        className="block object-contain dark:hidden"
      />

      <Image
        src="/assets/images/dark-illustration.png"
        width={270}
        height={200}
        alt="No results found illustration"
        className="hidden object-contain dark:block"
      />

      <h2 className="text-[30px] font-bold leading-[42px] tracking-tighter text-customDark-200 dark:text-customLight-900">
        {title}
      </h2>
      <p className="max-w-md text-center text-[14px] text-customDark-500 dark:text-customLight-700">
        {description}
      </p>
      <Link href={linkHref}>
        <Button className="min-h-[46px] rounded-lg bg-customOrange-500 px-4 py-3 text-[16px] font-medium leading-[22.4px] text-customLight-900 hover:opacity-50">
          {linkText}
        </Button>
      </Link>
    </div>
  )
}
