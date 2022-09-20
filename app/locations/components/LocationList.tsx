import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  IconButton,
  HStack,
  Tag,
  TagLabel,
  ChakraComponent,
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
import { Location } from "@prisma/client"
import getLocations from "app/locations/queries/getLocations"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FcEditImage, FcGlobe, FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc"

type LocationProp = { location: Location }
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
  const hovered = useColorModeValue("gray.50", "gray.700")
  const linkText = useColorModeValue("gray.800", "gray.200")
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
  const [{ locations }] = useQuery(
    getLocations,
    {
      where: { customerId },
      orderBy: sortBy,
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 60000,
      refetchIntervalInBackground: true,
    }
  )

  return (
    <Flex justifyContent="space-around">
      <VStack>
        <Box
          bg={useColorModeValue("gray.300", "gray.700")}
          borderWidth={20}
          borderRadius={8}
          borderColor={useColorModeValue("gray.100", "gray.800")}
        >
          <TableContainer borderRadius={8}>
            <Table
              size="sm"
              borderWidth={2}
              w="90vw"
              borderColor={useColorModeValue("gray.100", "gray.800")}
            >
              <Thead
                bg={useColorModeValue("gray.50", "gray.900")}
                borderBottomWidth={2}
                borderBottomColor="blackAlpha.200"
              >
                <Tr>
                  <HStack>
                    <Th
                      textColor={useColorModeValue("gray.800", "gray.500")}
                      fontWeight="extrabold"
                    >
                      Address
                    </Th>
                    <Tooltip label="Sort by address">
                      <IconButton
                        aria-label="Sort by address"
                        bg={useColorModeValue("transparent", "gray.900")}
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
                            { city: sortMethod },
                            { street: sortMethod },
                            { house: sortMethod },
                            { parcel: sortMethod },
                          ])
                        }}
                      />
                    </Tooltip>
                  </HStack>
                  <Th textColor={useColorModeValue("gray.800", "gray.500")} fontWeight="extrabold">
                    Block
                  </Th>
                  <Th textColor={useColorModeValue("gray.800", "gray.500")} fontWeight="extrabold">
                    Lot
                  </Th>
                  <HStack>
                    <Th
                      textColor={useColorModeValue("gray.800", "gray.500")}
                      fontWeight="extrabold"
                    >
                      Parcel
                    </Th>
                    <Tooltip label="Sort by parcel">
                      <IconButton
                        aria-label="Sort by parcel"
                        bg={useColorModeValue("transparent", "gray.900")}
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
                  <Th textColor={useColorModeValue("gray.800", "gray.500")} fontWeight="extrabold">
                    Map
                  </Th>
                </Tr>
              </Thead>
              <Tbody bg={useColorModeValue("gray.100", "gray.800")}>
                {locations.map((location) => {
                  return (
                    <Tr key={location.id} _hover={{ bg: hovered }}>
                      <Td>
                        <HStack>
                          <Link
                            href={Routes.ShowLocationPage({ customerId, locationId: location.id })}
                            passHref
                          >
                            <Text as="a" fontWeight="semibold" textColor={linkText}>
                              {`${location.house} ${location.street}, ${location.city}, ${location.zipcode}`}
                            </Text>
                          </Link>
                          <IconButton
                            aria-label="Edit location"
                            icon={<FaEdit size={10} />}
                            variant="ghost"
                          />
                        </HStack>
                      </Td>
                      <Td>
                        <Text fontWeight="semibold" textColor={linkText}>
                          {location.block}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontWeight="semibold" textColor={linkText}>
                          {location.lot}
                        </Text>
                      </Td>
                      <Td>
                        <Tag justifyContent="left" colorScheme="orange" ml={-2}>
                          {location.parcel ? (
                            <TagLabel>
                              <Link
                                href={`https://beacon.schneidercorp.com/Search?q=${location.parcel}`}
                                passHref
                              >
                                <Text
                                  as="a"
                                  fontSize="smaller"
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
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
                                <Text
                                  as="a"
                                  fontSize="smaller"
                                  rel="noopener norefferer"
                                  target="_blank"
                                >
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
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Text as="a" fontWeight="semibold" textColor={linkText}>
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
