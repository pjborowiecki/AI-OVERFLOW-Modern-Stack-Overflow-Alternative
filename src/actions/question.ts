"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/db"
import { type Question } from "@prisma/client"

export async function createQuestion(
  userId: string,

  title: string,
  explanation: string,
  tags: string[]
): Promise<Question | null> {
  try {
    return await prisma.question.create({
      data: {
        title,
        explanation,
        user: {
          connect: { id: userId },
        },
        tags: {
          connectOrCreate: tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error creating question")
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllQuestionsWithTagAndAuthorData() {
  try {
    return await prisma.question.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    revalidatePath("/")
  } catch (error) {
    console.error(error)
    throw new Error("Error getting all questions")
  } finally {
    await prisma.$disconnect()
  }
}

export async function getQuestionById(id: string): Promise<Question | null> {
  try {
    return await prisma.question.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting question by id")
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllQuestionsByUserId(
  userId: string
): Promise<Question[] | null> {
  try {
    return await prisma.question.findMany({
      where: { userId },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting all questions by user id")
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllQuestionsByTagId(
  tagId: string
): Promise<Question[] | null> {
  try {
    return await prisma.question.findMany({
      where: { id: tagId },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting all questions by tag id")
  } finally {
    await prisma.$disconnect()
  }
}
