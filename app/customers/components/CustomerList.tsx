import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import {
  FcPrevious,
  FcNext,
  FcExpand,
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from "react-icons/fc"
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
  VStack,
  useColorModeValue,
  HStack,
  Icon,
  IconButton,
  Tooltip,
} from "@chakra-ui/react"
import getCustomers from "../queries/getCustomers"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import LocationList from "app/locations/components/LocationList"
import db from "db"
import getLocations from "app/locations/queries/getLocations"
import { useState } from "react"
import { useEffect } from "react"
import { debug } from "webpack"

const ITEMS_PER_PAGE = 20

type SortOrder = "asc" | "desc"
// type Enumerable<T> = T | Array<T>;
// type CustomerOrderByWithRelationInput = {
//   id?: SortOrder
//   createdAt?: SortOrder
//   updatedAt?: SortOrder
//   firstname?: SortOrder
//   lastname?: SortOrder
//   locations?: LocationOrderByRelationAggregateInput
// }

const CustomersList = () => {
  const router = useRouter()
  // const [hovered, setHovered] = useState(false)
  const [sortMethod, setSortMethod] = useState("asc" as SortOrder)
  const hovered = useColorModeValue("gray.50", "gray.500")
  const [customerSelection, setCustomerSelection] = useState(0)
  const page = Number(router.query.page) || 0
  const [{ customers, hasMore }] = usePaginatedQuery(getCustomers, {
    orderBy: { lastname: sortMethod },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  // Table menus (e.g. Jobs) should be dynamic:
  //   When you select a location, the menu for Jobs should show that location's jobs.
  //   Needs to be, then, selection (default) for all locations.

  // useEffect(() => {
  //   const [{ locations }] = async () => {
  //     await new Promise((resolve) => {
  //       return resolve(
  //         db.location.findMany({
  //           where: { customerId: customerSelection },
  //           orderBy: [
  //             { primary: "asc" },
  //             { zipcode: "asc" },
  //             { city: "asc" },
  //             { street: "asc" },
  //             { house: "asc" },
  //           ],
  //         })
  //       )
  //     })
  //   }
  // })

  return (
    <Flex justify="center">
      <VStack w="inherit">
        <TableContainer borderRadius={8} justifyItems="center">
          <Table size="sm" borderWidth={1} w="90vw">
            <Thead bg={useColorModeValue("gray.100", "gray.700")} borderBottomWidth={2}>
              <Tr>
                <HStack>
                  <Th fontWeight="extrabold">Customer</Th>
                  <Tooltip label="Sort">
                    <IconButton
                      aria-label="Sort customers"
                      icon={
                        sortMethod == "asc" ? (
                          <FcAlphabeticalSortingAz size={15} />
                        ) : (
                          <FcAlphabeticalSortingZa size={15} />
                        )
                      }
                      bg={useColorModeValue("gray.100", "gray.700")}
                      onClick={() =>
                        sortMethod == "asc" ? setSortMethod("desc") : setSortMethod("asc")
                      }
                    />
                  </Tooltip>
                </HStack>
                <Th fontWeight="extrabold">Locations</Th>
                <Th fontWeight="extrabold">Jobs</Th>
                <Th fontWeight="extrabold">Estimates</Th>
                <Th fontWeight="extrabold">Invoices</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <Tr
                  key={customer.id}
                  onClick={() => router.push(Routes.ShowCustomerPage({ customerId: customer.id }))}
                  _hover={{ bg: hovered }}
                >
                  <Td>
                    <Link href={Routes.ShowCustomerPage({ customerId: customer.id })} passHref>
                      {`${customer.firstname} ${customer.lastname}`}
                    </Link>
                  </Td>
                  <Td>
                    <Link href={Routes.ShowCustomerPage({ customerId: customer.id })} passHref>
                      Locations
                    </Link>
                  </Td>
                  <Td>jobs</Td>
                  <Td>estimates</Td>
                  <Td>invoices</Td>
                </Tr>
              ))}
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
      </VStack>
    </Flex>
  )
}

export default CustomersList
