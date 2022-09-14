import { Box, Center, Menu, Spinner, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

type SearchResultsProps = {
  query: string
  message: string
  isLoading: boolean
  items: any[]
  children?: ReactNode
}

const SearchResults = ({ query, message, isLoading, items, children }: SearchResultsProps) => {
  return (
    <Box>
      {isLoading && (
        <Center p={3}>
          <Spinner />
        </Center>
      )}

      {!query && !items.length && !isLoading && (
        <Text pl={3} fontSize="md">
          {message}
        </Text>
      )}

      {query && !isLoading && items?.length === 0 && (
        <Text pl={3} fontSize="md">
          No results found for &quot;{query}&quot;.
        </Text>
      )}

      {!isLoading && items?.length > 0 && children}
    </Box>
  )
}

export default SearchResults
