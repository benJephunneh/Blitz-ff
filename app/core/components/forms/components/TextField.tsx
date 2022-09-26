import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"
import { useField } from "react-final-form"
import getFieldErrorMessage from "../helpers/getFieldErrorMessage"

type TextFieldProps = ComponentPropsWithoutRef<typeof Input> & {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number"
  icon?: JSX.Element
  suffix?: JSX.Element
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, icon, suffix, ...props }, ref) => {
    const { input, meta } = useField(name, {
      parse:
        props.type === "number"
          ? (v) => (v === "" ? null : Number(v))
          : (v) => (v === "" ? null : v),
    })

    const error = getFieldErrorMessage(meta)

    return (
      <FormControl isInvalid={meta.touched && error}>
        {label && <FormLabel>{label}</FormLabel>}

        <InputGroup>
          {icon && <InputLeftElement>{icon}</InputLeftElement>}
          <Input {...input} disabled={meta.submitting} variant="filled" {...props} ref={ref} />
          {suffix && <InputRightAddon>{suffix}</InputRightAddon>}
        </InputGroup>

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default TextField
