import { FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import { ComponentPropsWithoutRef } from "react"
import { useField } from "usetheform"

type NoteFieldUtfProps = ComponentPropsWithoutRef<typeof Textarea> & {
  isRequired?: boolean
  name: string
  label?: string
  error?: string
}

const NoteFieldUtf = ({ isRequired = false, name, label, error, ...props }) => {
  const fieldProps = useField({ type: "text", name })
  const isInvalid = error !== undefined

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Textarea borderColor={isInvalid ? "red" : "gray.400"} {...fieldProps} {...props} />
    </FormControl>
  )
}

export default NoteFieldUtf
