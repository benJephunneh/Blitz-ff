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
  useColorMode,
  Container,
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
  const [sortMethod, setSortMethod] = useState<SortOrder>("asc")
  const hovered = useColorModeValue("gray.50", "gray.700")
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
    <Flex justifyContent='space-around'>
      <VStack w="inherit">
        <Box bg={useColorModeValue('gray.200', 'gray.700')} borderWidth={2} borderRadius={8} borderColor={useColorModeValue('gray.100', 'gray.900')}>
          <TableContainer m={4} borderRadius={8} justifyItems="center">
            <Table
              size="sm"
              borderWidth={2}
              w="90vw"
              borderColor={useColorModeValue('gray.100', 'gray.800')}
              borderRadius={8}
            >
              <Thead bg={useColorModeValue("gray.50", "gray.900")} borderBottomWidth={2} borderBottomColor='blackAlpha.500'>
                <Tr>
                  <HStack>
                    <Th textColor={useColorModeValue('gray.800', 'gray.300')} fontWeight="extrabold">Customer</Th>
                    <Tooltip label="Sort">
                      <IconButton
                        aria-label="Sort customers"
                        variant='ghost'
                        icon={
                          sortMethod == "asc" ? (
                            <FcAlphabeticalSortingAz size={20} />
                          ) : (
                            <FcAlphabeticalSortingZa size={20} />
                          )
                        }
                        bg={useColorModeValue('transparent', "gray.900")}
                        onClick={() =>
                          sortMethod == "asc" ? setSortMethod("desc") : setSortMethod("asc")
                        }
                      />
                    </Tooltip>
                  </HStack>
                  <Th textColor={useColorModeValue('gray.800', 'gray.400')} fontWeight="extrabold">Locations</Th>
                  <Th textColor={useColorModeValue('gray.800', 'gray.400')} fontWeight="extrabold">Jobs</Th>
                  <Th textColor={useColorModeValue('gray.800', 'gray.400')} fontWeight="extrabold">Estimates</Th>
                  <Th textColor={useColorModeValue('gray.800', 'gray.400')} fontWeight="extrabold">Invoices</Th>
                </Tr>
              </Thead>
              <Tbody bg={useColorModeValue('gray.100', 'gray.800')}>
                {customers.map((customer) => (
                  <Tr
                    key={customer.id}
                    _hover={{ bg: hovered }}
                  >
                    <Td>
                      <Link href={Routes.ShowCustomerPage({ customerId: customer.id })} passHref>
                        <Text as='a' fontWeight='semibold' textColor={useColorModeValue('gray.800', 'gray.200')}>
                          {`${customer.firstname} ${customer.lastname}`}
                        </Text>
                      </Link>
                    </Td>
                    <Td>
                      <Link href={Routes.ShowCustomerPage({ customerId: customer.id })} passHref>
                        <Text as='a' fontWeight='semibold' textColor={useColorModeValue('gray.800', 'gray.200')}>
                          Locations
                        </Text>
                      </Link>
                    </Td>
                    <Td>
                      <Text fontWeight='semibold' textColor={useColorModeValue('gray.800', 'gray.200')}>
                        Jobs
                      </Text>
                    </Td>
                    <Td>
                      <Text fontWeight='semibold' textColor={useColorModeValue('gray.800', 'gray.200')}>
                        Estimates
                      </Text>
                    </Td>
                    <Td>
                      <Text fontWeight='semibold' textColor={useColorModeValue('gray.800', 'gray.200')}>
                        Invoices
                      </Text>
                    </Td>
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
        </Box>

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
    </Flex >
  )
}

export default CustomersList
