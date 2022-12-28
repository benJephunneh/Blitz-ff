import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
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
  error?: boolean
}

const TextFieldUtf = forwardRef<HTMLInputElement, TextFieldUtfProps>(
  ({ name, label, isRequired = true, prefix, suffix, footer, error, ...props }, ref) => {
    const fieldProps = useField({
      type: "text",
      name,
    })
    const hasError = error !== undefined
    // console.log({ ...status })
    // console.log({ ...validation })
    // console.log({ ...fieldProps })
    console.log({ ...props })
    console.log({ error })

    return (
      <FormControl isRequired={isRequired}>
        <InputGroup>
          {prefix && (
            <InputLeftElement bg="gray.100" minW="fit-content" px={2}>
              {prefix}
            </InputLeftElement>
          )}
          <Input type="text" {...props} {...fieldProps} ref={ref} />
          {suffix && <InputRightAddon>{suffix}</InputRightAddon>}
        </InputGroup>

        {!hasError ? (
          footer && <FormHelperText>{footer}</FormHelperText>
        ) : (
          <FormErrorMessage>{error}</FormErrorMessage>
        )}
      </FormControl>
    )
  }
)

export default TextFieldUtf
