import { useQuery } from "@blitzjs/rpc"
import { IconButton, HStack, Tag, TagLabel, Text } from "@chakra-ui/react"
import createLocation from "app/locations/mutations/createLocation"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import { PromiseReturnType } from "blitz"
import { useRouter } from "next/router"
import { ComponentType } from "react"
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

const LocationEntry = ({ location }: LocationProp) => {
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

type LocationListProps<Tag extends keyof JSX.IntrinsicElements> = {
  customerId: number
  tag: ComponentType | keyof JSX.IntrinsicElements
} & JSX.IntrinsicElements[Tag]

export const LocationList = ({ customerId, tag, ...rest }: LocationListProps) => {
  const router = useRouter()
  const [location] = useQuery(getLocation, { customerId, primary: true })
  const [{ locations }] = useQuery(getLocations, { where: { customerId, primary: false } })

  return (
    <>
      {location && <LocationEntry location={location} />}

      {locations.map((location) => {
        <tag {...rest}>
          <LocationEntry location={location} />
        </tag>
      })}
    </>
  )
}
// locations.map((location) => (
//   <LocationEntry location={location} />
// ))

