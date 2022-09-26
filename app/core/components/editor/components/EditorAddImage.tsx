import { useContext } from "react"
import editorContext from "../contexts/editorContext"
import ModalForm from "../../forms/ModalForm"
import addImageSchema from "../schema/addImageSchema"
import TextField from "../../forms/components/TextField"

const EditorAddImage = () => {
  const { editor, addingImage, toggleAddingImage } = useContext(editorContext)

  return (
    <ModalForm
      isOpen={addingImage}
      onClose={toggleAddingImage}
      title="Add an image"
      schema={addImageSchema}
      initialValues={{ image: "" }}
      submitText="Add"
      onSubmit={({ image }) => {
        editor.chain().focus().setImage({ src: image }).run()
        toggleAddingImage()
      }}
      render={() => (
        <TextField name="image" label="Image URL" placeholder="Paste the url of the image" />
      )}
    />
  )
}

export default EditorAddImage
