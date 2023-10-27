"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createQuestionAction } from "@/actions/question"
import { questionSchema } from "@/validations/question"
import { zodResolver } from "@hookform/resolvers/zod"
import { TRANSFORMERS } from "@lexical/markdown"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { editorConfig } from "@/config/editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ActionsPlugin } from "@/components/editor/plugins/actions-plugin"
import { CodeHighlightPlugin } from "@/components/editor/plugins/code-highlight-plugin"
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar-plugin"
import { Icons } from "@/components/icons"

interface QuestionAskFormProps {
  userId: string | undefined
}

export function QuestionAskForm({ userId }: QuestionAskFormProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  })

  function onSubmit(formData: z.infer<typeof questionSchema>) {
    startTransition(async () => {
      try {
        // TODO: Implement the logic here

        form.reset()
        toast.success("Question posted successfully")
        router.push("/")
      } catch (error) {
        toast.error("Something went wrong. Try again")
        console.error(error)
      }
    })
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      { title: string; explanation: string; tags: string[] },
      "tags"
    >
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault()

      const tagInput = e.target as HTMLInputElement
      const tagValue = tagInput.value.trim()

      if (tagValue !== "") {
        if (tagValue.length > 16) {
          Promise.resolve(
            form.setError("tags", {
              type: "required",
              message: "Tags must be 16 characters or less",
            })
          ).catch((error) => {
            console.error(error)
          })
        } else if (field.value.length > 5) {
          form.setError("tags", {
            type: "required",
            message: "You can add up to 5 tags only",
          })
        } else {
          const newValue = Array.isArray(field.value)
            ? [...field.value, tagValue]
            : [tagValue]

          form.setValue("tags", newValue)
          tagInput.value = ""
          form.clearErrors("tags")
        }
      } else {
        Promise.resolve(form.trigger()).catch((error) => {
          console.error(error)
        })
      }
    }
  }

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t: string) => t !== tag)

    form.setValue("tags", newTags)
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <div className="mb-1">
                <FormLabel className="text-[18px] font-semibold leading-[20.8px] text-customDark-400 dark:text-customLight-800">
                  Question Title{" "}
                  <span className="text-customOrange-500">*</span>
                </FormLabel>
                <FormDescription className="text-[14px] font-normal leading-[19.6px] text-customLight-500">
                  Be specific and imagine you are asking another person
                </FormDescription>
              </div>
              <FormControl>
                <Input
                  {...field}
                  className="min-h-[56px] border border-customLight-700 bg-customLight-800 text-[16px] font-normal leading-[22.4px] text-customDark-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-customDark-400 dark:bg-customDark-300 dark:text-customLight-700"
                />
              </FormControl>
              <div className="h-2">
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <div className="mb-1">
                <FormLabel className="text-[18px] font-semibold leading-[20.8px] text-customDark-400 dark:text-customLight-800">
                  Detailed explanation of your problem
                  <span className="text-customOrange-500">*</span>
                </FormLabel>
                <FormDescription className="text-[14px] font-normal leading-[19.6px] text-customLight-500">
                  Introduce the problem and explain what you have tried
                </FormDescription>
              </div>

              <FormControl>
                <LexicalComposer initialConfig={editorConfig}>
                  <div className="editor-container">
                    <ToolbarPlugin />
                    <div className="editor-inner">
                      <RichTextPlugin
                        contentEditable={
                          <ContentEditable className="editor-input" />
                        }
                        placeholder={
                          <div className="editor-placeholder">
                            Enter some text...
                          </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                      />

                      <HistoryPlugin />
                      <LinkPlugin />
                      <ListPlugin />
                      <AutoFocusPlugin />
                      <CodeHighlightPlugin />
                      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                      <OnChangePlugin
                        onChange={(editorState) => {
                          form.setValue(field.name, JSON.stringify(editorState))
                        }}
                      />
                    </div>
                    <ActionsPlugin />
                  </div>
                </LexicalComposer>
              </FormControl>
              <div className="h-2">
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <div className="mb-1">
                <FormLabel className="text-[18px] font-semibold leading-[20.8px] text-customDark-400 dark:text-customLight-800">
                  Tags
                  <span className="text-customOrange-500">*</span>
                </FormLabel>
                <FormDescription className="text-[14px] font-normal leading-[19.6px] text-customLight-500">
                  Separate tags by hitting enter after each. Up to 5 tags
                  allowed
                </FormDescription>
              </div>
              <FormControl>
                <>
                  <Input
                    className="min-h-[56px] border border-customLight-700 bg-customLight-800 text-[16px] font-normal leading-[22.4px] text-customDark-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-customDark-400 dark:bg-customDark-300 dark:text-customLight-700"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="mt-2 flex items-center justify-start gap-2">
                      {field.value.map((tag: string) => (
                        <Badge
                          key={tag}
                          onClick={() => handleTagRemove(tag, field)}
                          className="flex items-center justify-center gap-2 rounded-md border-none bg-customLight-800 px-4 py-2 text-[10px] font-medium capitalize leading-[13px] text-customLight-400 dark:bg-customDark-300 dark:text-customLight-500"
                        >
                          {tag}
                          <Icons.close className="h-3 w-3 cursor-pointer invert-0 dark:invert" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <div className="h-2">
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="primary-gradient w-fit rounded-lg !py-7 px-32 text-xl font-bold !text-customLight-900 hover:opacity-50"
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-5 w-5 animate-spin"
              aria-hidden="true"
            />
          )}
          {isPending ? "Submitting" : "Submit"}

          <span className="sr-only">Submit</span>
        </Button>
      </form>
    </Form>
  )
}
