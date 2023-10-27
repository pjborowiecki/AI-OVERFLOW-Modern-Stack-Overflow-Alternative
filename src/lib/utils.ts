import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  dayjs.extend(relativeTime)
  return dayjs(date).fromNow()
}

export function formatCount(count: number) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  } else {
    return count.toString()
  }
}

export function handleEditorError(error: Error): void {
  console.error(error)
}
