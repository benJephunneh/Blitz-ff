import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { LineItem } from "@prisma/client"
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef, useEffect, useState } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import LineItemSearch from "./LineItemSearch"
import { Droppable } from "react-beautiful-dnd"

interface LineItemSearchFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label?: string
  message?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  lineitems: {
    lineitems: LineItem[]
    setLineItems: () => void
  }
}

const LineItemSearchField = forwardRef<HTMLInputElement, LineItemSearchFieldProps>(
  ({ name, label, message, outerProps, labelProps, setLineitems }, ref) => {
    const { input, meta } = useField(name)
    const { value, onChange } = input
    const lineitems: number[] = []

    const onAdd = (lineitemId: number) => {
      lineitems.push(lineitemId)
      onChange(lineitems)
    }

    return (
      <FormControl {...outerProps}>
        <FormLabel mb={0} {...labelProps}>
          {label}
        </FormLabel>
        <Droppable droppableId="lineitem-search">
          {(provided, snapshot) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              <LineItemSearch message={message} onAdd={onAdd} itemizing={true} />
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </FormControl>
    )
  }
)

export default LineItemSearchField
