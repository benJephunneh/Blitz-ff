import { useQuery } from "@blitzjs/rpc"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import CustomerCard from "app/customers/components/CustomerCard"
import CustomerSearchResult from "app/customers/components/CustomerSearchResult"
import { useEffect, useState } from "react"
import findCustomer from "../customers/queries/findCustomer"
import search from "./queries/search"
import SearchInput from "./searchInput"
import SearchResults from "./SearchResults"

type CustomerSearchProps = {
  message?: string
  initialSearch?: string
  customerActions?: (item: Customer) => JSX.Element
}

const CustomerSearch = ({ message, initialSearch = "", customerActions }: CustomerSearchProps) => {
  const [query, setQuery] = useState(initialSearch)
  const [enabled, setEnabled] = useState(false)
  const [items, { status, isLoading }] = useQuery(
    findCustomer,
    // search,
    { query },
    { suspense: false, enabled: !!query }
  )

  return (
    <>
      <SearchInput search={setQuery} />

      <SearchResults message={message} query={query} items={items || []} isLoading={isLoading}>
        <SimpleGrid ml={4} columns={1} spacing={3}>
          {items?.map((item) => (
            <CustomerSearchResult key={item.id} customer={item} />
          ))}
        </SimpleGrid>
      </SearchResults>
    </>
  )
}

export default CustomerSearch
