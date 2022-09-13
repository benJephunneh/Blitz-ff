import { useQuery } from "@blitzjs/rpc"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import CustomerCard from "app/customers/components/CustomerCard"
import { useState } from "react"
import findCustomer from "../customers/queries/findCustomer"
import SearchInput from "./SearchInput"
import SearchResults from "./SearchResults"

type CustomerSearchProps = {
  customerActions?: (item: Customer) => JSX.Element
}

const CustomerSearch = ({ customerActions }: CustomerSearchProps) => {
  const [query, setQuery] = useState("")
  const [items, { isLoading }] = useQuery(
    findCustomer,
    { query },
    { suspense: false, enabled: !!query }
  )

  return (
    <Box>
      <SearchInput setQuery={setQuery} />

      <SearchResults
        message="Start typing to search for a customer"
        query={query}
        items={items || []}
        isLoading={isLoading}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3}>
          {items?.map((item) => (
            <CustomerCard
              key={item.id}
              customer={item}
              actions={customerActions && customerActions(item)}
            />
          ))}
        </SimpleGrid>
      </SearchResults>
    </Box>
  )
}

export default CustomerSearch
