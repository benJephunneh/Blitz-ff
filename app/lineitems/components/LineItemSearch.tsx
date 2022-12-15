import { useQuery } from "@blitzjs/rpc"
import { Box, Container, SimpleGrid, Stack } from "@chakra-ui/react"
import { LineItem } from "@prisma/client"
import SearchInput from "app/search/SearchInput"
import SearchResults from "app/search/SearchResults"
import { useEffect, useState } from "react"
import findLineItem from "../queries/findLineItem"
import LineItemCard from "./LineItemCard"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

type LineItemSearchProps = {
  message?: string
  itemizing?: boolean
  onAdd: (lineitemId: number) => void
  searchProvider: {
    query: string
    setQuery: (q: string) => void
    lineitems: LineItem[]
    lineitemSearchResults: LineItem[]
    isLoading: boolean
    setLineitems: (lineitems: LineItem[]) => void
  }
}

const LineItemSearch = ({
  message,
  itemizing = false,
  onAdd,
  searchProvider,
}: LineItemSearchProps) => {
  const { query, setQuery, lineitemSearchResults, isLoading } = searchProvider
  // const [lineitemSearchResults, { isLoading }] = useQuery(
  //   findLineItem,
  //   { query },
  //   { suspense: false, enabled: !!query }
  // )

  return (
    <Stack spacing={3}>
      <SearchInput search={setQuery} />

      <SearchResults
        message={message}
        query={query}
        items={lineitemSearchResults || []}
        isLoading={isLoading}
      >
        {lineitemSearchResults?.map((li, ii) => (
          <Draggable key={li.id} draggableId={li.id.toString()} index={ii}>
            {(provided, isDragging: boolean) => (
              <Box
                border="1px solid"
                borderColor="transparent"
                borderRadius="sm"
                bgColor={isDragging ? "whiteAlpha.600" : "white"}
                p={0}
                m="4px"
                // mb="8px"
                transition="100ms ease-in-out"
                backdropFilter="auto"
                backdropBlur={isDragging ? "2px" : "0px"}
                _hover={{ borderColor: "blue.400" }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <LineItemCard lineitem={li} onAdd={onAdd} itemizing={itemizing} />
              </Box>
            )}
          </Draggable>
        ))}
      </SearchResults>
    </Stack>
  )
}

export default LineItemSearch
