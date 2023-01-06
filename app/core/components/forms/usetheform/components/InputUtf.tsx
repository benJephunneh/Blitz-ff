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
import { ComponentPropsWithoutRef } from "react"
import { useField } from "usetheform"

interface InputUtfProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  type?: "text" | "email" | "password" | "tel" | "url"
  label?: string
  // touched: boolean
  // validators?: any
  // variant: ComponentPropsWithoutRef<typeof Input>
  isRequired?: boolean
  prefix?: string
  suffix?: string
  footer?: string
  error?: string
}

const InputUtf = ({
  name,
  type = "text",
  label,
  isRequired = true,
  prefix,
  suffix,
  footer,
  error,
  ...props
}: InputUtfProps) => {
  const fieldProps = useField({
    type,
    name,
  })
  const isInvalid = error !== undefined
  console.log("fieldprops", fieldProps)
  // console.log({ ...props })
  // console.log({ hasError })

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}

      <InputGroup my={2}>
        {prefix && <InputLeftAddon bg="blackAlpha.300">{prefix}</InputLeftAddon>}
        <Input {...props} {...fieldProps} borderColor={error ? "red" : "inherit"} />
        {suffix && <InputRightAddon>{suffix}</InputRightAddon>}
      </InputGroup>

      {isInvalid ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : footer ? (
        <FormHelperText>{footer}</FormHelperText>
      ) : null}
    </FormControl>
  )
}

export default InputUtf
