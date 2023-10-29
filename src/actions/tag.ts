"use server"

import { prisma } from "@/db"
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

export async function getTagsByQuestionId(
  questionId: string
): Promise<Tag[] | null> {
  try {
    return await prisma.tag.findMany({
      where: { questionId },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting tags by question id")
  }
}
