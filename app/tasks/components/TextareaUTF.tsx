import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react"
import { ComponentPropsWithoutRef } from "react"
import { TextArea, useField, useValidation } from "usetheform"

interface TextAreaUtfProps extends ComponentPropsWithoutRef<typeof Textarea> {
  name: string
  label?: string
  // touched: boolean
  // validators?: any
  // variant: ComponentPropsWithoutRef<typeof Input>
  isRequired?: boolean
  error?: string
}

const minLength = (l) => (val) => val && val.length < l ? "Textarea error.  Add a note." : undefined

const TextareaUtf = ({ name, label, isRequired = true, error, ...props }: TextAreaUtfProps) => {
  const fieldProps = useField({
    type: "text",
    name,
  })
  const hasError = error !== undefined
  // console.log({ ...fieldProps })
  // console.log({ ...props })
  // console.log({ error })

  return (
    <FormControl isRequired={isRequired} isInvalid={hasError}>
      {label && <FormLabel>{label}</FormLabel>}

      <Textarea {...props} {...fieldProps} borderColor={error ? "red" : "inherit"} />

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default TextareaUtf
