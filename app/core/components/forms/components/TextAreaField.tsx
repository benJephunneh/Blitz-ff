import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import getFieldErrorMessage from "../helpers/getFieldErrorMessage"

type TextAreaFieldProps = ComponentPropsWithoutRef<typeof Textarea> & {
  name: string
  label?: string
  // modelType: 'Customer' | 'Location' | 'Job' | 'Estimate' | 'Invoice' | 'LineItem'
  // modelId?: number
  isEditing: boolean
  fieldProps?: UseFieldConfig<string>
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      isEditing,
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
        <FormLabel mb={0} opacity=".9">
          {label}
        </FormLabel>
        <Textarea
          alignSelf="start"
          position="relative"
          mt={0}
          {...input}
          disabled={!isEditing && meta.submitting}
          variant="filled"
          {...props}
          ref={ref}
          overflowX="hidden"
          maxW="max-content"
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default TextAreaField
