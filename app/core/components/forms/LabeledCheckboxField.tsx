import {
  Checkbox,
  CheckboxProps,
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
import getFieldErrorMessage from "./helpers/getFieldErrorMessage"

interface LabeledCheckboxFieldProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  name: string
  // isChecked?: boolean
  label?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  children?: JSX.Element[]
  props?: ComponentPropsWithoutRef<typeof Checkbox>
}

const LabeledCheckboxField = forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  ({ label, outerProps, labelProps, name, children, ...props }, ref) => {
    const { input, meta } = useField(name, { type: "checkbox" })
    const error = getFieldErrorMessage(meta)
    console.log(`input: ${JSON.stringify(input)}`)

    return (
      <FormControl isInvalid={meta.touched && error} {...outerProps}>
        <HStack>
          {/* {label && (
            <FormLabel htmlFor={input.id} {...labelProps}>
              {label}
            </FormLabel>
          )} */}

          <Checkbox
            {...input}
            isChecked={input.checked}
            disabled={meta.submitting}
            {...props}
            ref={ref}
          />
        </HStack>

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledCheckboxField
