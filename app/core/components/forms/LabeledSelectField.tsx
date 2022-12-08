import { FormControl, FormLabel, Select } from "@chakra-ui/react"
import { forwardRef, PropsWithoutRef } from "react"
import { ComponentPropsWithoutRef } from "react"
import { useField } from "react-final-form"
import getFieldErrorMessage from "./helpers/getFieldErrorMessage"

interface LabeledSelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  name: string
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  children: JSX.Element[]
}

const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, children, ...props }, ref) => {
    const { input, meta } = useField(name)
    const error = getFieldErrorMessage(meta)

    return (
      <FormControl {...outerProps} isInvalid={meta.touched && error}>
        {label && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Select bg='gray.100' borderColor='whiteAlpha.100' {...input} value={input.value} disabled={meta.submitting} {...props} ref={ref}>
          {children}
        </Select>
      </FormControl>
    )
  }
)

export default LabeledSelectField
