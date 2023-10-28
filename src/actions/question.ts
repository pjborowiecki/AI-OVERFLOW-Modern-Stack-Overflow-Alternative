"use server"

import { prisma } from "@/db/prisma"
import { type Question } from "@prisma/client"

export async function createQuestionAction({ title, explanation, userId }) {
  return await prisma.question.create({})
}

export async function getAllQuestionsAction(): Promise<
  Question[] | null | undefined
> {
  return await prisma.question.findMany()
}

export async function getQuestionById(
  id: string
): Promise<Question | null | undefined> {
  return await prisma.question.findUnique({
    where: { id },
  })
}

export async function getAllQuestionsByUserId(
  userId: string
): Promise<Question[] | null | undefined> {
  return await prisma.question.findMany({
    where: { userId },
  })
}
