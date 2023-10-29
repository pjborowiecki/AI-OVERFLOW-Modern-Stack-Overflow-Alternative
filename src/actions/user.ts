"use server"

import { prisma } from "@/db/prisma"

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function getUserByResetPasswordToken(resetPasswordToken: string) {
  return await prisma.user.findUnique({
    where: {
      resetPasswordToken,
    },
  })
}

export async function getUserByEmailVerificationToken(
  emailVerificationToken: string
) {
  return await prisma.user.findUnique({
    where: {
      emailVerificationToken,
    },
  })
}
