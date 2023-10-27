"use client"

import * as React from "react"
import { $createCodeNode, $isCodeNode } from "@lexical/code"
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from "@lexical/markdown"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getRoot } from "lexical"

import { PLAYGROUND_TRANSFORMERS } from "@/components/editor/lib/markdown-transformers"
import { Icons } from "@/components/icons"

export function ActionsPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()

  const handleMarkdownToggle = React.useCallback(() => {
    editor.update(() => {
      const root = $getRoot()
      const firstChild = root.getFirstChild()
      if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
        $convertFromMarkdownString(
          firstChild.getTextContent(),
          PLAYGROUND_TRANSFORMERS
        )
      } else {
        const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS)
        root
          .clear()
          .append($createCodeNode("markdown").append($createTextNode(markdown)))
      }
      root.selectEnd()
    })
  }, [editor])

  return (
    <div className="actions">
      <button
        className="action-button"
        onClick={handleMarkdownToggle}
        title="Convert From Markdown"
        aria-label="Convert from markdown"
      >
        <Icons.editorMarkdown className="action-button-icon" />
      </button>
    </div>
  )
}
