import { useQuery } from "@blitzjs/rpc"
import { Customer } from "@prisma/client"
import { useEffect, useState } from "react"
import findCustomer from "../customers/queries/findCustomer"
import SearchInput from "./SearchInput"

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

      {/* <SearchResults message={message} query={query} items={items || []} isLoading={isLoading}> */}
      {/* <SimpleGrid ml={4} columns={1} spacing={3}>
          {items?.map((item) => (
            <CustomerSearchResult key={item.id} customer={item} />
          ))}
        </SimpleGrid> */}
      {/* </SearchResults> */}
    </>
  )
}

export default CustomerSearch
