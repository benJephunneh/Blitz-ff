import { FormControl, Input } from "@chakra-ui/react"
import { LineItem } from "@prisma/client"
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef, useEffect, useState } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import LineItemSearch from "./LineItemSearch"

interface LineItemFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

const LineItemField = forwardRef<HTMLInputElement, LineItemFieldProps>(
  ({ name, label, outerProps, labelProps }, ref) => {
    const { input, meta } = useField(name)
    const { value, onChange } = input
    const lineitems: number[] = []

    const onAdd = (lineitemId: number) => {
      lineitems.push(lineitemId)
      onChange(lineitems)
    }

    return (
      <FormControl {...outerProps}>
        <LineItemSearch message={label} onAdd={onAdd} itemizing={true} />
      </FormControl>
    )
  }
)

export default LineItemField
