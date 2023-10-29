/*
  Warnings:

  - You are about to drop the `TagsOnQuestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnQuestions" DROP CONSTRAINT "TagsOnQuestions_question_id_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnQuestions" DROP CONSTRAINT "TagsOnQuestions_tag_id_fkey";

-- DropTable
DROP TABLE "TagsOnQuestions";

-- CreateTable
CREATE TABLE "tags_on_questions" (
    "question_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_on_questions_pkey" PRIMARY KEY ("question_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "tags_on_questions" ADD CONSTRAINT "tags_on_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_on_questions" ADD CONSTRAINT "tags_on_questions_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
