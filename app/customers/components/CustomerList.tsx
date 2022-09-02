import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { FcPrevious, FcNext, FcExpand } from "react-icons/fc"
import CustomerListItem from "./CustomerListitem"
import {
  Grid,
  ButtonGroup,
  Button,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Spacer,
  Text,
  Box,
} from "@chakra-ui/react"
import getCustomers from "../queries/getCustomers"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import LocationList from "app/locations/components/LocationList"
import db from "db"
import getLocations from "app/locations/queries/getLocations"
import { useState } from "react"
import { useEffect } from "react"

const ITEMS_PER_PAGE = 100

const CustomersList = () => {
  const router = useRouter()
  const [customerSelection, setCustomerSelection] = useState(0)
  const page = Number(router.query.page) || 0
  const [{ customers, hasMore }] = usePaginatedQuery(getCustomers, {
    orderBy: { lastname: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  // Table menus (e.g. Jobs) should be dynamic:
  //   When you select a location, the menu for Jobs should show that location's jobs.
  //   Needs to be, then, selection (default) for all locations.

  useEffect(() => {
    const [{ locations }] = async () => {
      await new Promise((resolve) => {
        return resolve(
          db.location.findMany({
            where: { customerId: customerSelection },
            orderBy: [
              { primary: "asc" },
              { zipcode: "asc" },
              { city: "asc" },
              { street: "asc" },
              { house: "asc" },
            ],
          })
        )
      })
    }
  })

  return (
    <>
      <TableContainer>
        <Table bg="inherit" size="sm">
          <Thead>
            <Tr>
              <Th fontWeight="extrabold">Customer</Th>
              <Th fontWeight="extrabold">Locations</Th>
              <Th fontWeight="extrabold">Jobs</Th>
              <Th fontWeight="extrabold">Estimates</Th>
              <Th fontWeight="extrabold">Invoices</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.map((customer, ii) => {
              return (
                <Tr key={ii}>
                  <Td>
                    <Link href={Routes.ShowCustomerPage({ customerId: customer.id })}>
                      {`${customer.firstname} ${customer.lastname}`}
                    </Link>
                  </Td>
                  <Td>
                    <Menu isLazy gutter={0}>
                      <MenuButton
                        as={Button}
                        size="xs"
                        variant="ghost"
                        fontWeight="light"
                        rightIcon={<FcExpand size={10} />}
                      >
                        {locations.length === 1
                          ? `${locations[0]!.house} ${locations[0]!.street}`
                          : `Locations`}
                      </MenuButton>
                      <MenuList>
                        {locations.map((location, jj) => {
                          return (
                            <MenuItem key={jj}>
                              {location.house} {location.street} {location.city} {location.zipcode}
                            </MenuItem>
                          )
                        })}
                      </MenuList>
                    </Menu>
                  </Td>
                  <Td>jobs</Td>
                  <Td>estimates</Td>
                  <Td>invoices</Td>
                </Tr>
              )
            })}
          </Tbody>
          {/*
        {customers.map((customer, ii) => (
          <CustomerListItem key={ii} customerId={customer.id}>
            {customer.firstname} {customer.lastname}
          </CustomerListItem>
        ))}
        */}
        </Table>
      </TableContainer>

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
