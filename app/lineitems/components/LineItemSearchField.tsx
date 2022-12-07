import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
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
  searchProvider: {
    query: string
    setQuery: (q: string) => void
    lineitems: LineItem[]
    lineitemSearchResults: LineItem[]
    isLoading: boolean
    setLineitems: (lineitems: LineItem[]) => void
  }
}

const LineItemSearchField = forwardRef<HTMLInputElement, LineItemSearchFieldProps>(
  ({ name, label, message, outerProps, labelProps, searchProvider }, ref) => {
    const { input, meta } = useField(name)
    const { value, onChange } = input
    // const lineitems: number[] = []
    const { lineitems, setLineitems, lineitemSearchResults } = searchProvider

    const onAdd = (lineitemId: number) => {
      if (lineitems.findIndex(({ id }) => id == lineitemId) !== -1) return

      const addition = lineitemSearchResults.find(({ id }) => id === lineitemId)
      if (addition) setLineitems([...lineitems, addition])
      onChange(lineitems)
    }

    return (
      <FormControl {...outerProps} overflowY="scroll">
        <FormLabel mb={0} {...labelProps}>
          {label}
        </FormLabel>
        <Droppable droppableId="lineitem-search">
          {(provided, snapshot) => (
            <Flex
              ref={provided.innerRef}
              {...provided.droppableProps}
              maxH="100%"
              direction="column"
              overflow="hidden"
              backgroundClip="padding-box"
            >
              <LineItemSearch
                message={message}
                onAdd={onAdd}
                itemizing={true}
                searchProvider={searchProvider}
              />
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </FormControl>
    )
  }
)

export default LineItemSearchField
