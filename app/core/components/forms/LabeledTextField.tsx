import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  useColorModeValue,
} from "@chakra-ui/react"
import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number" | "price"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, type, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const bg = useColorModeValue("white", "gray.700")
    const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

    return (
      <FormControl {...outerProps}>
        <FormLabel mb={0} {...labelProps}>
          {label}
        </FormLabel>
        {/* {type === "price" && ( */}
        <InputGroup>
          {type === "price" && <InputLeftAddon children="$" bg="green.200" />}{" "}
          {/* eslint-disable-line */}
          <Input
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
            bg={bg}
            borderColor={borderColor}
            type={type === "price" ? "number" : "text"}
          />
        </InputGroup>
        {/* )}
        {type !== "price" && (
          <Input
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
            bg={bg}
            borderColor={borderColor}
          />
        )} */}

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    )
  }
)

export default LabeledTextField
