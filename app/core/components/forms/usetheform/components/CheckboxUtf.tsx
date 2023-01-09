import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react"
import { ComponentPropsWithoutRef, HTMLInputTypeAttribute } from "react"
import { useField } from "usetheform"

interface CheckboxUtfProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  // type?: HTMLInputTypeAttribute // "text" | "email" | "password" | "tel" | "url"
  label?: string
  // touched: boolean
  // validators?: any
  // variant: ComponentPropsWithoutRef<typeof Input>
  prefix?: string
  suffix?: string
  footer?: string
  error?: string
}

const CheckboxUtf = ({
  name,
  // type = "text",
  label,
  prefix,
  suffix,
  footer,
  error,
  ...props
}: CheckboxUtfProps) => {
  const fieldProps = useField({
    type: "checkbox",
    name,
  })
  const isInvalid = error !== undefined
  // console.log("fieldprops", fieldProps)
  // console.log({ ...props })
  // console.log({ hasError })
  // console.log({ error })

  return (
    <FormControl isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Checkbox {...props} {...fieldProps} borderColor={error ? "red" : "inherit"} />

      {isInvalid ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : footer ? (
        <FormHelperText>{footer}</FormHelperText>
      ) : null}
    </FormControl>
  )
}

export default CheckboxUtf
