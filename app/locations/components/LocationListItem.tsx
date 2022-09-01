import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import {
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react"
import { PromiseReturnType } from "blitz"
import Link from "next/link"
import { Router, useRouter } from "next/router"
import { FcGlobe } from "react-icons/fc"
import createLocation from "../mutations/createLocation"
import deleteLocation from "../mutations/deleteLocation"

type LocationProp = { location: PromiseReturnType<typeof createLocation> }

const MapLinkIcon = ({ location }: LocationProp) => {
  const router = useRouter()

  return (
    <Button
      aria-label="Link to Google map"
      size="sm"
      variant="link"
      leftIcon={<FcGlobe />}
      fontWeight="light"
    >
      <a
        target="_blank"
        href={`http://maps.google.com/maps?q=${location.house} ${location.street} ${location.city},${location.state}`}
        rel="noopener noreferrer"
      >
        map
      </a>
    </Button>
  )
}

const ParcelIdTag = ({ parcelId }: { parcelId: string | null }) => {
  const router = useRouter()

  if (!parcelId) {
    return <TagLabel>asdf</TagLabel>
  }
}

const LocationListItem = ({ location }: LocationProp) => {
  const router = useRouter()
  const [deleteLocationMutation] = useMutation(deleteLocation)

  return (
    <>
      <HStack spacing={4} ml={4}>
        <Link
          href={Routes.ShowLocationPage({
            customerId: location.customerId,
            locationId: location.id,
          })}
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
          {location.parcel ? (
            <TagLabel>
              <Link
                href={`https://qpublic.schneidercorp.com/Search?q=${location.parcel}`}
                passHref
                rel="noopener noreferrer"
                target="_blank"
              >
                <Text>Parcel ID: {location.parcel}</Text>
              </Link>
            </TagLabel>
          ) : (
            <TagLabel>
              <Link
                href={`https://qpublic.schneidercorp.com/Search?q=${location.house} ${location.street}`}
                passHref
                rel="noopener noreferrer"
                target="_blank"
              >
                <Text as="a">Find parcel ID</Text>
              </Link>
            </TagLabel>
          )}
        </Tag>
        <MapLinkIcon location={location} />
      </HStack>
    </>
  )
}

const GadsdenLink = () => {}

export default LocationListItem
