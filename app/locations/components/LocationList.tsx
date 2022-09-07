import { Routes } from "@blitzjs/next"
import { usePaginatedQuery } from "@blitzjs/rpc"
import {
  IconButton,
  HStack,
  Tag,
  TagLabel,
  ChakraComponent,
  Button,
  ButtonGroup,
  Grid,
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  VStack,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react"
import createLocation from "app/locations/mutations/createLocation"
import getLocations from "app/locations/queries/getLocations"
import { PromiseReturnType } from "blitz"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useState } from "react"
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcExpand,
  FcGlobe,
  FcNext,
  FcNumericalSorting12,
  FcNumericalSorting21,
  FcPrevious,
} from "react-icons/fc"
import LocationListItem from "./LocationListItem"

type LocationProp = { location: PromiseReturnType<typeof createLocation> }
type SortOrder = "asc" | "desc"

const MapLinkIcon = ({ location }: LocationProp) => {
  const router = useRouter()

  return (
    <IconButton
      aria-label="Link to Google map"
      icon={<FcGlobe />}
      variant="ghost"
      onClick={() =>
        router.push(
          `http://maps.google.com/maps?q=${location.house} ${location.street} ${location.city},${location.state}`
        )
      }
    />
  )
}

type ChakraFragment = ChakraComponent<"div", {}>

export const LocationEntry = ({ location }: LocationProp) => {
  console.log(JSON.stringify(location))
  return (
    <HStack spacing={4} ml={4}>
      <Link
        href={Routes.ShowLocationPage({ customerId: location.customerId, locationId: location.id })}
        passHref
      >
        {`${location.house} ${location.street}, ${location.city} ${location.zipcode}`}
      </Link>
      {/*
      <Text>
        {location.house} {location.street}, {location.city} {location.zipcode}
      </Text>
  */}
      <Tag colorScheme="orange" ml={3}>
        <TagLabel>Parcel ID: {location.parcel}</TagLabel>
      </Tag>
      <MapLinkIcon location={location} />
    </HStack>
  )
}

const ITEMS_PER_PAGE = 20
const LocationList = ({ customerId }: { customerId: number }) => {
  const router = useRouter()
  const initialSortBy = [
    { primary: "asc" as SortOrder },
    { zipcode: "asc" as SortOrder },
    { city: "asc" as SortOrder },
    { street: "asc" as SortOrder },
    { house: "asc" as SortOrder },
    { parcel: "asc" as SortOrder },
  ]

  const [sortMethod, setSortMethod] = useState<SortOrder>("asc")
  const [sortBy, setSortBy] = useState(initialSortBy)
  const page = Number(router.query.page) || 0
  const [{ locations, hasMore }] = usePaginatedQuery(getLocations, {
    where: { customerId },
    orderBy: sortBy,
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Flex justify="center">
      <VStack w="inherit">
        <TableContainer borderRadius={8} justifyItems="center">
          <Table size="sm" borderWidth={1} w="90vw">
            <Thead bg={useColorModeValue("gray.100", "gray.700")} borderBottomWidth={2}>
              <Tr>
                <HStack>
                  <Th fontWeight="extrabold">Address</Th>
                  <Tooltip label="Sort by address">
                    <IconButton
                      aria-label="Sort by address"
                      bg={useColorModeValue("gray.100", "gray.700")}
                      icon={
                        sortMethod == "asc" ? (
                          <FcAlphabeticalSortingAz size={15} />
                        ) : (
                          <FcAlphabeticalSortingZa size={15} />
                        )
                      }
                      onClick={() => {
                        sortMethod == "asc" ? setSortMethod("desc") : setSortMethod("asc")
                        setSortBy([
                          { primary: "asc" },
                          { zipcode: sortMethod },
                          { city: "asc" },
                          { street: "asc" },
                          { house: sortMethod },
                          { parcel: "asc" },
                        ])
                      }}
                    />
                  </Tooltip>
                </HStack>
                <Th fontWeight="extrabold">Block</Th>
                <Th fontWeight="extrabold">Lot</Th>
                <HStack>
                  <Th fontWeight="extrabold">Parcel</Th>
                  <Tooltip label="Sort by parcel">
                    <IconButton
                      aria-label="Sort by parcel"
                      bg={useColorModeValue("gray.100", "gray.700")}
                      icon={
                        sortMethod == "asc" ? (
                          <FcAlphabeticalSortingAz size={15} />
                        ) : (
                          <FcAlphabeticalSortingZa size={15} />
                        )
                      }
                      onClick={() => {
                        sortMethod == "asc" ? setSortMethod("desc") : setSortMethod("asc")
                        setSortBy([
                          { parcel: sortMethod },
                          { primary: "asc" },
                          { zipcode: "asc" },
                          { city: "asc" },
                          { street: "asc" },
                          { house: "asc" },
                        ])
                      }}
                    />
                  </Tooltip>
                </HStack>
                <Th fontWeight="extrabold">Map</Th>
              </Tr>
            </Thead>
            <Tbody>
              {locations.map((location, ii) => {
                return (
                  <Tr key={ii}>
                    <Td>
                      <Link
                        href={Routes.ShowLocationPage({ customerId, locationId: location.id })}
                        passHref
                      >
                        {`${location.house} ${location.street}, ${location.city}, ${location.zipcode}`}
                      </Link>
                    </Td>
                    <Td>{location.block}</Td>
                    <Td>{location.lot}</Td>
                    <Td>{location.parcel}</Td>
                    <Td>map</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>

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

export default LocationList
