import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth"
import { QuestionCreateForm } from "@/components/forms/question-create-form"

export default async function AskQuestionPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/signin")

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-customDark-100 dark:text-customLight-900">
        Ask a Question
      </h1>
      <div>
        <QuestionCreateForm userId={user.id} />
      </div>
    </div>
  )
}
