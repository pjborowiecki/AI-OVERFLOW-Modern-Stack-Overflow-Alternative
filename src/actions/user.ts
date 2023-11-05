"use server"

import { prisma } from "@/db"
import { type GetAllUsersParams } from "@/types"
import { type User } from "@prisma/client"

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email")
  }
}

export async function getUserByResetPasswordToken(
  resetPasswordToken: string
): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        resetPasswordToken,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by reset password token")
  }
}

export async function getUserByEmailVerificationToken(
  emailVerificationToken: string
): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        emailVerificationToken,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email verification token")
  }
}

export async function getAllUsers(
  params: GetAllUsersParams
): Promise<Pick<User, "id" | "email" | "image">[]> {
  try {
    console.log(params) // TODO: remove later (satisfy linter)
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        image: true,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Error getting all users")
  }
}
