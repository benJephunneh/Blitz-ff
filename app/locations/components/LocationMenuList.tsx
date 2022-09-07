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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import createLocation from "app/locations/mutations/createLocation"
import getLocations from "app/locations/queries/getLocations"
import { PromiseReturnType } from "blitz"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { FcExpand, FcGlobe, FcNext, FcPrevious } from "react-icons/fc"
import LocationListItem from "./LocationListItem"
import LocationMenuListItem from "./LocationMenuListItem"
import LocationModalForm from "./LocationModalForm"

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

const LocationMenuList = ({ customerId }: { customerId: number }) => {
  const router = useRouter()
  const [creatingLocation, setCreatingLocation] = useState(false)
  const [mutationState, setMutationState] = useState<MutationType>("New")
  const [{ locations, count }] = useQuery(getLocations, {
    where: { customerId },
    orderBy: [
      { primary: "asc" },
      { zipcode: "asc" },
      { city: "asc" },
      { street: "asc" },
      { house: "asc" },
    ],
  })

  return (
    <>
      {locations.map((location, ii) => {
        return (
          <LocationMenuListItem key={ii} location={location}>
            {location.house} {location.street} {location.city}, {location.zipcode}
          </LocationMenuListItem>
        )
      })}
    </>
  )
}

export default LocationMenuList
