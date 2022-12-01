import { useQuery } from "@blitzjs/rpc"
import { Box, Container, SimpleGrid, Stack } from "@chakra-ui/react"
import SearchInput from "app/search/SearchInput"
import SearchResults from "app/search/SearchResults"
import { useState } from "react"
import findLineItem from "../queries/findLineItem"
import LineItemCard from "./LineItemCard"

type LineItemSearchProps = {}

const LineItemSearch = () => {
  const [query, setQuery] = useState("")
  const [lineitemSearchResults, { isLoading }] = useQuery(
    findLineItem,
    { query },
    { suspense: false, enabled: !!query }
  )

  return (
    <Stack spacing={3}>
      <SearchInput search={setQuery} />

      <Container>
        <SearchResults
          message="Search to add jobs"
          query={query}
          items={lineitemSearchResults || []}
          isLoading={isLoading}
        >
          <SimpleGrid columns={1} spacing={1}>
            {lineitemSearchResults?.map((li, ii) => (
              <LineItemCard key={ii} lineitem={li} />
            ))}
          </SimpleGrid>
        </SearchResults>
      </Container>
    </Stack>
  )
}

export default LineItemSearch
