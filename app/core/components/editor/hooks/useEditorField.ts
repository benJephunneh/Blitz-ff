import type { Editor } from "@tiptap/react"
import type { EditorFeatures } from "../helpers/getEditorExtensions"
import type { UseFieldConfig } from "react-final-form"

import { useState, useEffect } from "react"
import { useField } from "react-final-form"
import { useEditor } from "@tiptap/react"

import getEditorExtensions from "../helpers/getEditorExtensions"
import getFieldErrorMessage from "../../forms/helpers/getFieldErrorMessage"

type UseEditorFieldOptions = {
  fieldProps?: UseFieldConfig<string>
  features?: EditorFeatures
  required?: string
  autofocus?: boolean
}

const useEditorField = (
  name: string,
  { fieldProps, features, required, autofocus }: UseEditorFieldOptions
) => {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [showError, setShowError] = useState(false)
  const [focused, setFocused] = useState(false)

  const { input, meta } = useField(name, {
    ...fieldProps,
    validate: () => {
      if (required && !editor?.getText().trim()) {
        return required
      }
    },
  })

  const tiptap = useEditor({
    extensions: getEditorExtensions(features),
    content: input.value,
    autofocus: autofocus ? "end" : false,

    onBlur: ({ editor }) => {
      input.onChange(editor.getJSON())
      input.onBlur()
      setShowError(true)
      setFocused(false)
    },

    onUpdate: () => {
      setShowError(false)
    },

    onFocus: () => {
      input.onFocus()
      setFocused(true)
    },
  })

  useEffect(() => {
    setEditor(tiptap)
  }, [tiptap])

  useEffect(() => {
    if (meta.submitFailed) setShowError(true)
  }, [meta.submitFailed])

  return {
    editor,
    error: showError && getFieldErrorMessage(meta),
    meta: { ...meta, focused },
  }
}

export default useEditorField
