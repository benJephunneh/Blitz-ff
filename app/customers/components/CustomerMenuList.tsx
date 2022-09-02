import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { FcPrevious, FcNext } from "react-icons/fc"
import CustomerListItem from "./CustomerListitem"
import { Grid, List } from "@chakra-ui/react"
import getCustomers from "../queries/getCustomers"
import CustomerMenuListItem from "./CustomerMenuListitem"

const CustomersList = () => {
  const router = useRouter()
  const [{ customers }] = useQuery(getCustomers, {})

  return (
    <>
      <List bg="inherit" borderRadius={8}>
        {customers.map((customer, ii) => (
          <CustomerMenuListItem key={ii} id={customer.id}>
            {customer.firstname} {customer.lastname}
          </CustomerMenuListItem>
        ))}
      </List>
    </>
  )
}

export default CustomersList
