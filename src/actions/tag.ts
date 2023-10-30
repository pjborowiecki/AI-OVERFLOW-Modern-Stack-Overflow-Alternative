"use server"

import { prisma } from "@/db"
import { type GetTopTagsByUserParams } from "@/types"
import { type Tag } from "@prisma/client"

export async function getAllTags(): Promise<Tag[] | null> {
  try {
    return await prisma.tag.findMany()
  } catch (error) {
    console.error(error)
    throw new Error("Error getting all tags")
  }
}

export async function getTags(tags: string[]): Promise<Tag[] | null> {
  try {
    return await prisma.tag.findMany({
      where: { name: { in: tags } },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting tags")
  }
}

// TODO: Update to include interactions with answers
export async function getTopTagsByUser(
  params: GetTopTagsByUserParams
): Promise<Tag[]> {
  try {
    return prisma.tag.findMany({
      where: {
        questions: {
          some: {
            user: {
              id: params.userId,
            },
          },
        },
      },
      orderBy: {
        questions: {
          _count: "desc",
        },
      },
      take: params.limit || 3,
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting top tags by user")
  }
}

export async function getTagById(id: string): Promise<Tag | null> {
  try {
    return await prisma.tag.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting tag by id")
  }
}

export async function getTagByName(name: string): Promise<Tag | null> {
  try {
    return await prisma.tag.findUnique({
      where: { name },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting tag by name")
  }
}
