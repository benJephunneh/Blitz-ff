import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Switch,
  SwitchProps,
} from "@chakra-ui/react"
import { forwardRef, PropsWithoutRef } from "react"
import { ComponentPropsWithoutRef } from "react"
import { useField } from "react-final-form"
import getFieldErrorMessage from "./getFieldErrorMessage"

interface LabeledCheckboxFieldProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  name: string
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  children: JSX.Element[]
  props?: ComponentPropsWithoutRef<typeof Checkbox>
}

const LabeledCheckboxField = forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  ({ label, outerProps, labelProps, name, children, ...props }, ref) => {
    const { input, meta } = useField(name, { type: "checkbox" })
    const error = getFieldErrorMessage(meta)

    return (
      <FormControl isInvalid={meta.touched && error} {...outerProps}>
        <HStack>
          <Switch
            {...input}
            isChecked={input.checked}
            disabled={meta.submitting}
            {...props}
            ref={ref}
          />

          {label && (
            <FormLabel htmlFor={input.id} {...labelProps}>
              {label}
            </FormLabel>
          )}
        </HStack>

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledCheckboxField
