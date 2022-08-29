import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { IconButton, HStack, Tag, TagLabel, Text, MenuItem } from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import createLocation from "app/locations/mutations/createLocation"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import { PromiseReturnType } from "blitz"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ComponentType } from "react"
import { ReactNode } from "react"
import { FcGlobe } from "react-icons/fc"

type LocationProp = { location: PromiseReturnType<typeof createLocation> }

const MapLinkIcon = ({ location }: LocationProp) => {
  const router = useRouter()

  return (
    <IconButton
      aria-label="Link to Google map"
      icon={<FcGlobe />}
      onClick={() =>
        router.push(
          `http://maps.google.com/maps?q=${location.house} ${location.street} ${location.city},${location.state}`
        )
      }
    />
  )
}

export const LocationEntry = ({ location }: LocationProp) => {
  return (
    <HStack>
      <Text>
        {location.house} {location.street}, {location.city} {location.zipcode}
      </Text>
      <Tag colorScheme="orange" size="sm">
        <TagLabel>{location.parcel}</TagLabel>
      </Tag>
      <MapLinkIcon location={location} />
    </HStack>
  )
}

type LocationListProps = {
  customerId: number
}

const LocationList = ({ customerId }: LocationListProps) => {
  const [{ locations }] = useQuery(getLocations, {
    where: { customerId },
    orderBy: {
      primary: "asc",
    },
  })

  return (
    <>
      {locations.map((location) => {
        ;<MenuItem>
          <Link href={Routes.ShowCustomerPage({ where: {} })} passHref>
            <LocationEntry location={location} />
          </Link>
        </MenuItem>
      })}
    </>
  )
}

export default LocationList
