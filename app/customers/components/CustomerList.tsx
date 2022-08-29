import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { FcPrevious, FcNext } from "react-icons/fc"
import getCustomers from "../queries/getCustomers"
import CustomerListItem from "./CustomerListitem"
import { Grid, ButtonGroup, Button } from "@chakra-ui/react"

const ITEMS_PER_PAGE = 100

const CustomersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ customers, hasMore }] = usePaginatedQuery(getCustomers, {
    orderBy: { lastname: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <Grid
        shadow="md"
        bg="white"
        flexDirection="column"
        borderRadius={8}
        templateAreas={`'name name locations jobs invoices estimates'`}
      >
        {customers.map((customer, ii) => (
          <CustomerListItem key={ii} id={customer.id}>
            {customer.firstname} {customer.lastname}
          </CustomerListItem>
        ))}
      </Grid>

      {/*
      <Flex bg='white' borderRadius={8}>
        <ButtonGroup flexDirection='column' w='full' isAttached>
          {customers.map((customer) => (
            <CustomerListItem key={customer.id}>
              {customer.firstname} {customer.lastname}
            </CustomerListItem>
          ))}
        </ButtonGroup>
      </Flex>
          */}

      <ButtonGroup pt={5} isAttached variant="outline">
        <Button disabled={page === 0} onClick={goToPreviousPage} leftIcon={<FcPrevious />}>
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage} rightIcon={<FcNext />}>
          Next
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CustomersList
