import type { Editor } from "@tiptap/react"

import { FC, ReactNode, useState } from "react"

import editorActionsContext from "../contexts/editorContext"
import EditorAddLink from "../components/EditorAddLink"
import EditorAddImage from "../components/EditorAddImage"

const { Provider } = editorActionsContext

type EditorActionsProviderProps = {
  editor: Editor
  children: ReactNode
}

const EditorActionsProvider: FC<EditorActionsProviderProps> = ({ editor, children }) => {
  const [addingLink, setAddingLink] = useState(false)
  const [addingImage, setAddingImage] = useState(false)

  const toggleAddingLink = () => setAddingLink((state) => !state)
  const toggleAddingImage = () => setAddingImage((state) => !state)

  return (
    <Provider
      value={{
        editor,

        addingLink,
        toggleAddingLink,

        addingImage,
        toggleAddingImage,
      }}
    >
      {addingLink && <EditorAddLink />}
      {addingImage && <EditorAddImage />}

      {children}
    </Provider>
  )
}

export default EditorActionsProvider
