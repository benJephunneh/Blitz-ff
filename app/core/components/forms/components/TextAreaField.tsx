import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import getFieldErrorMessage from "../helpers/getFieldErrorMessage"

type TextAreaFieldProps = ComponentPropsWithoutRef<typeof Textarea> & {
  name: string
  label?: string
  // modelType: 'Customer' | 'Location' | 'Job' | 'Estimate' | 'Invoice' | 'LineItem'
  // modelId?: number
  // isEditing: boolean
  fieldProps?: UseFieldConfig<string>
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      // isEditing,
      name,
      label,
      // modelType,
      // modelId,
      ...props
    },
    ref
  ) => {
    const { input, meta } = useField(name)
    const error = getFieldErrorMessage(meta)

    return (
      <FormControl isInvalid={meta.touched && error}>
        <FormLabel opacity=".9">{label}</FormLabel>
        <Textarea
          // alignSelf="start"
          // position="relative"
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
