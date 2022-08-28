import { Suspense, useState } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import getCustomers from "app/customers/queries/getCustomers"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import { FaPlus } from "react-icons/fa"
import NewCustomerModalForm from "app/customers/components/NewCustomerModalForm"
import CustomerListItem from "app/customers/components/CustomerListitem"
import { FcNext, FcPrevious } from "react-icons/fc"
const ITEMS_PER_PAGE = 100

export const CustomersList = () => {
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
        bg="white"
        flexDirection="column"
        borderRadius={8}
        templateAreas={`'name locations jobs invoices estimates'`}
      >
        {customers.map((customer) => (
          <CustomerListItem key={customer.id} id={customer.id}>
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

      <ButtonGroup pt={5} isAttached>
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={goToPreviousPage}
          leftIcon={<FcPrevious />}
        >
          Previous
        </Button>
        <Button variant="outline" disabled={!hasMore} onClick={goToNextPage} rightIcon={<FcNext />}>
          Next
        </Button>
      </ButtonGroup>
    </>
  )
}

const CustomersPage = () => {
  const [creatingCustomer, setCreatingCustomer] = useState(false)

  return (
    <SidebarLayout title="Customers">
      <NewCustomerModalForm
        isOpen={creatingCustomer}
        onClose={() => {
          setCreatingCustomer(false)
        }}
      />

      <ButtonGroup spacing={0} flexDirection="column">
        <Button
          onClick={() => {
            setCreatingCustomer(true)
          }}
          variant="outline"
          leftIcon={<FaPlus />}
          borderStyle="dashed"
          borderColor="blackAlpha.400"
          color="#009a4c"
          mb={4}
        >
          Create customer
        </Button>

        <CustomersList />
      </ButtonGroup>
    </SidebarLayout>
  )
}

CustomersPage.authenticate = { redirectTo: Routes.Home() }
// CustomersPage.getLayout = (page) => {
//   <SidebarLayout title="Customers" description="Customer list">
//     {page}
//   </SidebarLayout>
// }

export default CustomersPage
