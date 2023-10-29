import * as z from "zod"

export const createQuestionSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(10, {
      message: "Title must be made of at least 10 characters",
    })
    .max(256, {
      message: "Title must be made of at most 256 characters",
    }),
  explanation: z
    .string({
      required_error: "Explanation is required",
      invalid_type_error: "Explanation must be a string",
    })
    .min(10, {
      message: "Description must be made of at least 10 characters",
    }),
  tags: z
    .array(
      z
        .string({
          required_error: "Tags are required",
          invalid_type_error: "Tags must be strings",
        })
        .min(3, {
          message: "Tags must be made of at least 3 characters",
        })
        .max(16, {
          message: "Tags must be made of at most 32 characters",
        })
    )
    .min(1, {
      message: "At least one tag is required",
    })
    .max(5, {
      message: "A maximum of 5 tags is allowed",
    }),
})

export const updateQuestionSchema = z.object({})
