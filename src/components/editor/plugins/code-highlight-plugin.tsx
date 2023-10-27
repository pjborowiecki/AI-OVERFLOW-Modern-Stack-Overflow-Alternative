"use client"

import * as React from "react"
import { registerCodeHighlighting } from "@lexical/code"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export function CodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext()
  React.useEffect(() => {
    return registerCodeHighlighting(editor)
  }, [editor])
  return null
}
