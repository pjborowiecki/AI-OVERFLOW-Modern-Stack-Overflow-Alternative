// @ts-nocheck

"use client"

import * as React from "react"
import {
  $createCodeNode,
  $isCodeNode,
  getCodeLanguages,
  getDefaultCodeLanguage,
} from "@lexical/code"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text"
import { $isAtNodeEnd, $wrapNodes } from "@lexical/selection"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

const LowPriority = 1

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
])

const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
}

function Divider() {
  return <div className="divider" />
}

function positionEditorElement(editor, rect) {
  if (rect === null) {
    editor.style.opacity = "0"
    editor.style.top = "-1000px"
    editor.style.left = "-1000px"
  } else {
    editor.style.opacity = "1"
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`
  }
}

function FloatingLinkEditor({ editor }) {
  const editorRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const mouseDownRef = React.useRef(false)
  const [linkUrl, setLinkUrl] = React.useState("")
  const [isEditMode, setEditMode] = React.useState(false)
  const [lastSelection, setLastSelection] = React.useState(null)

  const updateLinkEditor = React.useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
      } else {
        setLinkUrl("")
      }
    }
    const editorElem = editorRef.current
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (editorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0)
      let rect
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild
        }
        rect = inner.getBoundingClientRect()
      } else {
        rect = domRange.getBoundingClientRect()
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect)
      }
      setLastSelection(selection)
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElem, null)
      setLastSelection(null)
      setEditMode(false)
      setLinkUrl("")
    }

    return true
  }, [editor])

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor()
          return true
        },
        LowPriority
      )
    )
  }, [editor, updateLinkEditor])

  React.useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  React.useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
                }
                setEditMode(false)
              }
            } else if (event.key === "Escape") {
              event.preventDefault()
              setEditMode(false)
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

function Select({ onChange, className, options, value }) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function getSelectedNode(selection) {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  }
}

function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}) {
  const dropDownRef = React.useRef(null)

  React.useEffect(() => {
    const toolbar = toolbarRef.current
    const dropDown = dropDownRef.current

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect()
      dropDown.style.top = `${top + 40}px`
      dropDown.style.left = `${left}px`
    }
  }, [dropDownRef, toolbarRef])

  React.useEffect(() => {
    const dropDown = dropDownRef.current
    const toolbar = toolbarRef.current

    if (dropDown !== null && toolbar !== null) {
      const handle = (event) => {
        const target = event.target

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false)
        }
      }
      document.addEventListener("click", handle)

      return () => {
        document.removeEventListener("click", handle)
      }
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef])

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  return (
    <div className="dropdown" ref={dropDownRef}>
      <button className="item" onClick={formatParagraph}>
        <Icons.editorTextParagraph className="icon" />
        <span>Normal</span>
        {blockType === "paragraph" && <span className="active" />}
      </button>

      <button className="item" onClick={formatLargeHeading}>
        <Icons.editorTypeH1 className="icon" />
        <span>Large Heading</span>
        {blockType === "h1" && <span className="active" />}
      </button>
      <button className="item" onClick={formatSmallHeading}>
        <Icons.editorTypeH2 className="icon" />
        <span>Small Heading</span>
        {blockType === "h2" && <span className="active" />}
      </button>
      <button className="item" onClick={formatBulletList}>
        <Icons.editorListUl className="icon" />
        <span>Bullet List</span>
        {blockType === "ul" && <span className="active" />}
      </button>
      <button className="item" onClick={formatNumberedList}>
        <Icons.editorListOl className="icon" />
        <span>Numbered List</span>
        {blockType === "ol" && <span className="active" />}
      </button>
      <button className="item" onClick={formatQuote}>
        <Icons.editorChatSquareQuote className="icon" />
        <span>Quote</span>
        {blockType === "quote" && <span className="active" />}
      </button>
      <button className="item" onClick={formatCode}>
        <Icons.editorCode className="icon" />
        <span>Code Block</span>
        {blockType === "code" && <span className="active" />}
      </button>
    </div>
  )
}

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = React.useRef(null)
  const [blockType, setBlockType] = React.useState("paragraph")
  const [selectedElementKey, setSelectedElementKey] = React.useState(null)
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    React.useState(false)
  const [codeLanguage, setCodeLanguage] = React.useState("")
  const [isLink, setIsLink] = React.useState(false)
  const [isBold, setIsBold] = React.useState(false)
  const [isItalic, setIsItalic] = React.useState(false)
  const [isUnderline, setIsUnderline] = React.useState(false)
  const [isStrikethrough, setIsStrikethrough] = React.useState(false)
  const [isCode, setIsCode] = React.useState(false)

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)
          const type = parentList ? parentList.getTag() : element.getTag()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          setBlockType(type)
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage())
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsCode(selection.hasFormat("code"))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [editor])

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar()
          return false
        },
        LowPriority
      )
    )
  }, [editor, updateToolbar])

  const codeLanguges = React.useMemo(() => getCodeLanguages(), [])
  const onCodeLanguageSelect = React.useCallback(
    (e) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value)
          }
        }
      })
    },
    [editor, selectedElementKey]
  )

  const insertLink = React.useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://")
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  return (
    <div className="toolbar" ref={toolbarRef}>
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className="toolbar-item block-controls"
            onClick={() =>
              setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
            }
            aria-label="Formatting Options"
          >
            <span className={"icon block-type " + blockType} />
            <span className="text">{blockTypeToBlockName[blockType]}</span>
            <Icons.editorChevronDown className="chevron-down" />
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body
            )}
          <Divider />
        </>
      )}
      {blockType === "code" ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }}
            className={cn("toolbar-item spaced", isBold ? "active" : "")}
            aria-label="Format Bold"
          >
            <Icons.editorTypeBold className="toolbar-item-icon" />
          </button>

          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }}
            className={"toolbar-item spaced " + (isItalic ? "active" : "")}
            aria-label="Format Italics"
          >
            <Icons.editorTypeItalic className="toolbar-item-icon" />
          </button>

          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }}
            className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
            aria-label="Format Underline"
          >
            <Icons.editorTypeUnderline className="toolbar-item-icon" />
          </button>

          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
            }}
            className={
              "toolbar-item spaced " + (isStrikethrough ? "active" : "")
            }
            aria-label="Format Strikethrough"
          >
            <Icons.editorTypeStrikethrough className="toolbar-item-icon" />
          </button>

          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
            }}
            className={"toolbar-item spaced " + (isCode ? "active" : "")}
            aria-label="Insert Code"
          >
            <Icons.editorCode className="toolbar-item-icon" />
          </button>

          <button
            onClick={insertLink}
            className={"toolbar-item spaced " + (isLink ? "active" : "")}
            aria-label="Insert Link"
          >
            <Icons.editorLink className="toolbar-item-icon" />
          </button>

          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
        </>
      )}
    </div>
  )
}
