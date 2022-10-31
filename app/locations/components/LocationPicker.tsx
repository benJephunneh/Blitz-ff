import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  Button,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import headerContext from "app/core/components/header/headerContext"
import customerContext from "app/customers/contexts/customerContext"
import Link from "next/link"
import { useContext } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import { FcHome } from "react-icons/fc"
import locationContext from "../contexts/locationContext"
import getLocations from "../queries/getLocations"

type LocationPickerProps = {
  icon: IconType
}

const LocationPicker = ({ icon }: LocationPickerProps) => {
  const { locations } = useContext(locationContext)
  const { pickLocation } = useContext(headerContext)

  const LocationHeading = () => {
    return (
      <HStack>
        <Icon as={icon} w={5} h={5} />
        <Heading size="sm">
          Location list
          {/* {`${primaryLocation?.house} ${primaryLocation?.street}, ${primaryLocation?.city}  ${primaryLocation?.zipcode}`} */}
          {/* {customer?.firstname} {customer?.lastname} */}
        </Heading>
      </HStack>
    )
  }

  const MList = () => {
    return (
      <MenuList>
        {locations?.map((l, ii) => (
          // <Link
          //   key={location.id}
          //   href={Routes.ShowLocationPage({ customerId: customer?.id, locationId: location.id })}
          //   passHref
          // >
          <MenuItem key={ii} fontWeight="semibold" fontSize="sm" onClick={() => pickLocation(l.id)}>
            {`${l.house} ${l.street}, ${l.city}  ${l.zipcode}`}
          </MenuItem>
          // </Link>
        ))}
      </MenuList>
    )
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        px={1}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
      >
        <LocationHeading />
      </MenuButton>
      <MList />
    </Menu>
  )
}

export default LocationPicker
