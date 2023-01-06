import { TextArea, useValidation } from "usetheform"

const minLength = (l) => (val) => val && val.length < l ? "Textarea error.  Add a note." : undefined

const TextareaUTF = () => {
  const [{ error }, validation] = useValidation([minLength(1)])

  return (
    <>
      <TextArea
        touched
        name="notes"
        data-testid="textarea"
        placeholder="Task notes..."
        {...validation}
      />
      {error && <label>{error}</label>}
    </>
  )
}

export default TextareaUTF
