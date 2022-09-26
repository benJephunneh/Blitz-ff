import { useContext } from "react"

import editorContext from "../contexts/editorContext"
import ModalForm from "../../forms/ModalForm"
import addLinkSchema from "../schema/addLinkSchema"
import TextField from "../../forms/components/TextField"

const EditorAddLink = () => {
  const { editor, addingLink, toggleAddingLink } = useContext(editorContext)

  return (
    <ModalForm
      isOpen={addingLink}
      onClose={toggleAddingLink}
      title="Add a link"
      schema={addLinkSchema}
      initialValues={{ link: editor.getAttributes("link").href || "" }}
      submitText="Add"
      onSubmit={({ link }) => {
        if (!link || link === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run()
          toggleAddingLink()
          return
        }

        if (!link.match(/^https?\:\/\//)) {
          link = "https://" + link
        }

        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: encodeURI(link) })
          .run()

        toggleAddingLink()
      }}
      render={() => <TextField name="link" label="Link" placeholder="https://..." />}
    />
  )
}

export default EditorAddLink
