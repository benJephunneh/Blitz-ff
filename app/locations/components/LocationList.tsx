import { Routes } from "@blitzjs/next"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
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
  Box,
  Text,
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
  const hovered = useColorModeValue('gray.50', 'gray.700')
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
  const [{ locations }] = useQuery(getLocations, {
    where: { customerId },
    orderBy: sortBy,
  })

  return (
    <Flex justifyContent='space-around'>
      <VStack w="inherit">
        <Box bg={useColorModeValue('gray.200', 'gray.700')} borderWidth={2} borderRadius={8} borderColor={useColorModeValue('gray.100', 'gray.900')}>
          <TableContainer m={4} borderRadius={8} justifyContent="space-around">
            <Table
              size="sm"
              borderWidth={2}
              w="90vw"
              borderColor={useColorModeValue('gray.100', 'gray.800')}
            >
              <Thead bg={useColorModeValue("gray.50", "gray.900")} borderBottomWidth={2} borderBottomColor='blackAlpha.500'>
                <Tr>
                  <HStack>
                    <Th textColor={useColorModeValue('gray.800', 'gray.300')} fontWeight="extrabold">Address</Th>
                    <Tooltip label="Sort by address">
                      <IconButton
                        aria-label="Sort by address"
                        bg={useColorModeValue('transparent', "gray.900")}
                        icon={
                          sortMethod == "asc" ? (
                            <FcNumericalSorting12 size={20} />
                          ) : (
                            <FcNumericalSorting21 size={20} />
                          )
                        }
                        onClick={() => {
                          sortMethod == "asc" ? setSortMethod("desc") : setSortMethod("asc")
                          setSortBy([
                            { primary: "asc" },
                            { zipcode: sortMethod },
                            { city: "asc" },
                            { street: "asc" },
                            { house: "asc" },
                            { parcel: "asc" },
                          ])
                        }}
                      />
                    </Tooltip>
                  </HStack>
                  <Th textColor={useColorModeValue('gray.800', 'gray.400')} fontWeight="extrabold">Block</Th>
                  <Th textColor={useColorModeValue('gray.800', 'gray.400')} fontWeight="extrabold">Lot</Th>
                  <HStack>
                    <Th textColor={useColorModeValue('gray.800', 'gray.400')} fontWeight="extrabold">Parcel</Th>
                    <Tooltip label="Sort by parcel">
                      <IconButton
                        aria-label="Sort by parcel"
                        bg={useColorModeValue('transparent', 'gray.900')}
                        icon={
                          sortMethod == "asc" ? (
                            <FcNumericalSorting12 size={20} />
                          ) : (
                            <FcNumericalSorting21 size={20} />
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
                  <Th textColor={useColorModeValue('gray.800', 'gray.400')} fontWeight="extrabold">Map</Th>
                </Tr>
              </Thead>
              <Tbody bg={useColorModeValue('gray.100', 'gray.800')}>
                {locations.map((location) => {
                  return (
                    <Tr
                      key={location.id}
                      _hover={{ bg: hovered }}
                    >
                      <Td>
                        <Link
                          href={Routes.ShowLocationPage({ customerId, locationId: location.id })}
                          passHref
                        >
                          <Text as='a' fontWeight='semibold' textColor={useColorModeValue('gray.800', 'gray.200')}>
                            {`${location.house} ${location.street}, ${location.city}, ${location.zipcode}`}
                          </Text>
                        </Link>
                      </Td>
                      <Td>
                        <Text fontWeight='semibold' textColor={useColorModeValue('gray.800', 'gray.200')}>
                          {location.block}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontWeight='semibold' textColor={useColorModeValue('gray.800', 'gray.200')}>
                          {location.lot}
                        </Text>
                      </Td>
                      <Td>
                        <Tag justifyContent='left' colorScheme="orange" ml={-2}>
                          {location.parcel ? (
                            <TagLabel>
                              <Link href={`https://beacon.schneidercorp.com/Search?q=${location.parcel}`} passHref>
                                <Text as="a" fontSize="smaller" rel="noopener noreferrer" target="_blank">
                                  {location.parcel}
                                </Text>
                              </Link>
                            </TagLabel>
                          ) : (
                            <TagLabel>
                              <Link
                                href={`https://beacon.schneidercorp.com/Search?q=${location.house} ${location.street}`}
                                passHref
                              >
                                <Text as="a" fontSize="smaller" rel="noopener norefferer" target="_blank">
                                  Find parcel ID
                                </Text>
                              </Link>
                            </TagLabel>
                          )}
                        </Tag>
                      </Td>
                      <Td>
                        <Link
                          href={`http://maps.google.com/maps?q=${location.house} ${location.street} ${location.city},${location.state}`}
                          passHref
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Text as='a' fontWeight='semibold' textColor={useColorModeValue('gray.800', 'blue.200')}>
                            map
                          </Text>
                        </Link>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Flex>
  )
}

export default LocationList
