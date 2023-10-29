"use server"

import crypto from "crypto"
import { getUserByEmail } from "@/actions/user"
import { prisma } from "@/db/prisma"
import { env } from "@/env.mjs"
import {
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
} from "resend/build/src/emails/interfaces"

import { resend } from "@/config/email"
import { EmailVerificationEmail } from "@/components/emails/email-verification-email"

export async function sendEmail(
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions | undefined
) {
  const data = await resend.emails.send(payload, options)
  console.log("Email sent successfully")
  return data
}

export async function resendEmailVerificationLink(email: string) {
  const user = await getUserByEmail(email)
  if (!user) return "not-found"

  const emailVerificationToken = crypto.randomBytes(32).toString("base64url")
  const userUpdated = await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerificationToken,
    },
  })
  const emailSent = await sendEmail({
    from: env.RESEND_EMAIL_FROM,
    to: [email],
    subject: "Verify your email address",
    react: EmailVerificationEmail({ email, emailVerificationToken }),
  })
  if (!userUpdated || !emailSent) return null
  return "success"
}

export async function checkIfEmailVerified(email: string) {
  const user = await getUserByEmail(email)
  if (user?.emailVerified instanceof Date) {
    return true
  } else {
    return false
  }
}
