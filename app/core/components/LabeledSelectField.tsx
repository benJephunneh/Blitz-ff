import { FormControl, FormLabel, Select } from "@chakra-ui/react"
import { forwardRef, PropsWithoutRef } from "react"
import { ComponentPropsWithoutRef } from "react"

interface LabeledSelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  name: string
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  children: JSX.Element[]
}

const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, children, ...props }, ref) => {
    return (
      <FormControl {...outerProps}>
        {label && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Select {...props}>{children}</Select>
      </FormControl>
    )
  }
)

export default LabeledSelectField
