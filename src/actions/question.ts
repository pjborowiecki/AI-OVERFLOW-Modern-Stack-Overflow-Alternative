"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/db"
import { type CreateQuestionParams, type GetAllQuestionsParams } from "@/types"
import { type Question } from "@prisma/client"

export async function createQuestion(
  params: CreateQuestionParams
): Promise<Question | null> {
  try {
    return await prisma.question.create({
      data: {
        title: params.title,
        explanation: params.explanation,
        user: {
          connect: { id: params.userId },
        },
        tags: {
          connectOrCreate: params.tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error creating question")
  }
}

export async function getAllQuestionsWithTagAndAuthorData(
  params: GetAllQuestionsParams
) {
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
        createdAt: params.sort || "desc",
      },
    })
    revalidatePath("/")
  } catch (error) {
    console.error(error)
    throw new Error("Error getting all questions")
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
  }
}
