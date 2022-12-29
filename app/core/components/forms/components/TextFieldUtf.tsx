import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
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
      <FormControl isRequired={isRequired}>
        {label && <FormLabel>{label}</FormLabel>}

        <InputGroup>
          {/* {prefix && (
                        <InputLeftElement bg="gray.100" minW="fit-content" px={2}>
                            {prefix}
                        </InputLeftElement>
                    )} */}
          <Input
            type="text"
            {...props}
            {...fieldProps}
            ref={ref}
            borderColor={error ? "red" : "inherit"}
          />
          {suffix && <InputRightAddon>{suffix}</InputRightAddon>}
        </InputGroup>

        {error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : footer ? (
          <FormHelperText>asdf</FormHelperText>
        ) : null}
      </FormControl>
    )
  }
)

export default TextFieldUtf
