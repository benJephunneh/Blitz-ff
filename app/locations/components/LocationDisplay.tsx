import { Text } from "@chakra-ui/react"
import { Location } from "@prisma/client"

type LocationDisplayProps = {
  location?: Location
}
const LocationDisplay = ({ location }: LocationDisplayProps) => {
  return (
    <Text>
      {location?.house} {location?.street}
      {location ? "," : null} {location?.city} {location?.zipcode}
    </Text>
  )
}

export default LocationDisplay
