import { useQuery } from "@blitzjs/rpc"
import findCustomer from "app/customers/queries/findCustomer"
import { useState } from "react"
import SearchInput from "./SearchInput"
import SearchResults from "./SearchResults"

const SubheaderSearch = () => {
  const [query, setQuery] = useState("")
  const [items, { isLoading }] = useQuery(
    findCustomer,
    { query },
    { suspense: false, enabled: !!query }
  )

  return (
    <>
      <SearchInput search={setQuery} />
      <SearchResults
        message="Start typing to search..."
        query={query}
        items={items || []}
        isLoading={isLoading}
      ></SearchResults>
    </>
  )
}

export default SubheaderSearch
