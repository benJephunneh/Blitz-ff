import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import getFieldErrorMessage from "../helpers/getFieldErrorMessage"

type TextAreaFieldProps = ComponentPropsWithoutRef<typeof Textarea> & {
  name: string
  label?: string
  fieldProps?: UseFieldConfig<string>
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ name, label, ...props }, ref) => {
    const { input, meta } = useField(name)
    const error = getFieldErrorMessage(meta)

    return (
      <FormControl isInvalid={meta.touched && error}>
        <FormLabel opacity=".9">{label}</FormLabel>
        <Textarea
          {...input}
          disabled={meta.submitting}
          variant="filled"
          {...props}
          ref={ref}
          overflowX="hidden"
          minW="max-content"
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default TextAreaField
