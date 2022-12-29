import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"
import { useField, useValidation } from "usetheform"
import { ZodSchema } from "zod"
import getFieldErrorMessage from "../helpers/getFieldErrorMessage"

type TextFieldUtfProps = ComponentPropsWithoutRef<typeof Input> & {
  name: string
  label: string
  // touched: boolean
  // validators?: any
  // variant: ComponentPropsWithoutRef<typeof Input>
  isRequired?: boolean
  prefix?: JSX.Element
  suffix?: JSX.Element
  footer?: JSX.Element
  error?: string
}

const TextFieldUtf = forwardRef<HTMLInputElement, TextFieldUtfProps>(
  ({ name, label, isRequired = true, prefix, suffix, footer, error, ...props }, ref) => {
    const fieldProps = useField({
      type: "text",
      name,
    })
    const hasError = error !== undefined
    // console.log({ ...fieldProps })
    // console.log({ ...props })

    return (
      <FormControl isRequired={isRequired} isInvalid={hasError}>
        {label && <FormLabel>{label}</FormLabel>}

        <InputGroup>
          {prefix && <InputLeftAddon>{prefix}</InputLeftAddon>}
          <Input {...props} {...fieldProps} ref={ref} borderColor={error ? "red" : "inherit"} />
          {suffix && <InputRightAddon>{suffix}</InputRightAddon>}
        </InputGroup>

        {error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : footer ? (
          <FormHelperText>{footer}</FormHelperText>
        ) : null}
      </FormControl>
    )
  }
)

export default TextFieldUtf
