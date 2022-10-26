import { FormControl, FormErrorMessage, HStack, UnorderedList } from "@chakra-ui/react"
import { forwardRef, PropsWithoutRef } from "react"
import { ComponentPropsWithoutRef } from "react"
import { useField } from "react-final-form"
import getFieldErrorMessage from "./helpers/getFieldErrorMessage"

interface LabeledListFieldProps extends ComponentPropsWithoutRef<typeof UnorderedList> {
  name: string
  // isChecked?: boolean
  label?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  children?: JSX.Element[]
  props?: ComponentPropsWithoutRef<typeof UnorderedList>
}

const LabeledListField = forwardRef<HTMLUListElement, LabeledListFieldProps>(
  ({ name, label, outerProps, labelProps, children, ...props }, ref) => {
    const { input, meta } = useField(name, { type: "checkbox" })
    const error = getFieldErrorMessage(meta)
    // console.log(`input: ${JSON.stringify(input)}`)

    return (
      <FormControl isInvalid={meta.touched && error} {...outerProps}>
        <HStack>
          <UnorderedList {...input} {...props} ref={ref} />
        </HStack>

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledListField
