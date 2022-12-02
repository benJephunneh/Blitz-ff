import { Box, Center, Menu, Spinner, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

type SearchResultsProps = {
  query: string
  message?: string
  isLoading: boolean
  items: any[]
  children?: ReactNode
}

const SearchResults = ({ query, message, isLoading, items, children }: SearchResultsProps) => {
  // console.log(`isLoading: ${isLoading}`)

  return (
    <Box mt={4}>
      {isLoading && !!query && (
        <Center p={3}>
          <Spinner />
        </Center>
      )}

      {!query && !items.length && message && (
        <Text pl={3} fontSize="md" fontWeight="semibold">
          {message}
        </Text>
      )}

      {query && !isLoading && items?.length === 0 && (
        <Text pl={3} fontSize="md" fontWeight="semibold">
          No results found for &quot;{query}&quot;.
        </Text>
      )}

      {!isLoading && items?.length > 0 && children}
    </Box>
  )
}

export default SearchResults
