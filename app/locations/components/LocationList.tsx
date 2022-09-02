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
} from "@chakra-ui/react"
import createLocation from "app/locations/mutations/createLocation"
import getLocations from "app/locations/queries/getLocations"
import { PromiseReturnType } from "blitz"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { FcGlobe, FcNext, FcPrevious } from "react-icons/fc"
import LocationListItem from "./LocationListItem"

type LocationProp = { location: PromiseReturnType<typeof createLocation> }

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
  const page = Number(router.query.page) || 0
  const [{ locations, hasMore }] = usePaginatedQuery(getLocations, {
    where: { customerId },
    orderBy: [
      { primary: "asc" },
      { zipcode: "asc" },
      { city: "asc" },
      { street: "asc" },
      { house: "asc" },
    ],
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <TableContainer>
        <Table bg="inherit" size="sm">
          <Thead>
            <Tr>
              <Th fontWeight="extrabold">Address</Th>
              <Th fontWeight="extrabold">Block</Th>
              <Th fontWeight="extrabold">Lot</Th>
              <Th fontWeight="extrabold">Parcel</Th>
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

      <ButtonGroup mt={5} isAttached variant="outline">
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

export default LocationList
