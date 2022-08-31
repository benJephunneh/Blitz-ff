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
            <Menu>
              <TagLabel as="button">Parcel ID: {location.parcel}</TagLabel>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    router.push(`https://qpublic.schneidercorp.com/Search?q=4061n2w1543)`)
                  }
                >
                  {location.parcel}
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href={`https://qpublic.schneidercorp.com/Search?q=${location.parcel}`} passHref>
              <TagLabel as="a">{location.parcel}</TagLabel>
            </Link>
          )}
        </Tag>
        <MapLinkIcon location={location} />
      </HStack>
    </>
  )
}

export default LocationListItem
