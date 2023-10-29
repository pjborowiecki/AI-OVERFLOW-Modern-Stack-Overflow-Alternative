import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { QuestionAskForm } from "@/components/forms/question-create-form"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function AskQuestionPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-customDark-100 dark:text-customLight-900">
        Ask a Question
      </h1>
      <div>
        <QuestionAskForm userId={session.user.id} />
      </div>
    </div>
  )
}
