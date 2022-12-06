import { useQuery } from "@blitzjs/rpc"
import { Box, Container, SimpleGrid, Stack } from "@chakra-ui/react"
import { LineItem } from "@prisma/client"
import SearchInput from "app/search/SearchInput"
import SearchResults from "app/search/SearchResults"
import { useEffect, useState } from "react"
import findLineItem from "../queries/findLineItem"
import LineItemCard from "./LineItemCard"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

type LineItemSearchProps = {
  message?: string
  onAdd: (lineitemId: number) => void
  itemizing?: boolean
}

const LineItemSearch = ({ message, onAdd, itemizing = false }: LineItemSearchProps) => {
  const [query, setQuery] = useState("")
  const [lineitemSearchResults, { isLoading }] = useQuery(
    findLineItem,
    { query },
    { suspense: false, enabled: !!query }
  )

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
          <LineItemCard
            key={li.id}
            lineitem={li}
            onAdd={onAdd}
            itemizing={itemizing}
            draggableIndex={ii}
            mb="8px"
          />
        ))}
      </SearchResults>
    </Stack>
  )
}

export default LineItemSearch
