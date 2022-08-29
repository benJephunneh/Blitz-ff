import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  IconButton,
  HStack,
  Tag,
  TagLabel,
  Text,
  MenuItem,
  ChakraComponent,
  forwardRef,
  Button,
} from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import createLocation from "app/locations/mutations/createLocation"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import { PromiseReturnType } from "blitz"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ComponentType, Suspense } from "react"
import { ReactNode } from "react"
import { FcGlobe } from "react-icons/fc"
import { Location } from "db"
import { createRef } from "react"

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
      {/*
      <Link href={Routes.ShowLocationPage({ customerId: location.customerId, id: location.id })} passHref>
        {location.house} {location.street}, {location.city} {location.zipcode}
      </Link>
  */}
      <Text>
        {location.house} {location.street}, {location.city} {location.zipcode}
      </Text>
      <Tag colorScheme="orange" ml={3}>
        <TagLabel>Parcel ID: {location.parcel}</TagLabel>
      </Tag>
      <MapLinkIcon location={location} />
    </HStack>
  )
}

const LocationList = ({ customerId }: { customerId: number }) => {
  const [{ locations }] = useQuery(getLocations, {
    where: { customerId },
    orderBy: { primary: "desc" },
  })

  return (
    <>
      {locations.map((location, ii) => {
        return (
          <Link key={ii} href={Routes.ShowCustomerPage({ customerId })} passHref>
            <LocationEntry location={location} />
          </Link>
        )
      })}
    </>
  )
}

export default LocationList
