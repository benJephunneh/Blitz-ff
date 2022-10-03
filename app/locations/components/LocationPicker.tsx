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
import customerContext from "app/customers/contexts/customerContext"
import Link from "next/link"
import { useContext } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import { FcHome } from "react-icons/fc"
import getLocations from "../queries/getLocations"

type LocationPickerProps = {
  icon: IconType
}

const LocationPicker = ({ icon }: LocationPickerProps) => {
  const { customer } = useContext(customerContext)
  const [locations, { refetch: refetchLocations }] = useQuery(
    getLocations,
    {
      where: { customerId: customer.id },
      orderBy: [
        { primary: "asc" },
        { zipcode: "asc" },
        { city: "asc" },
        { street: "asc" },
        { house: "asc" },
      ],
    },
    {
      suspense: false,
      refetchOnWindowFocus: false,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
    }
  )

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        px={1}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
      >
        <HStack>
          <Icon as={icon} w={5} h={5} />
          <Heading size="sm">
            {customer.firstname} {customer.lastname}
          </Heading>
        </HStack>
      </MenuButton>

      <MenuList>
        <>
          {locations?.locations.map((location) => (
            <Link
              key={location.id}
              href={Routes.ShowLocationPage({ customerId: customer.id, locationId: location.id })}
              passHref
            >
              <MenuItem as="a" fontWeight="semibold" fontSize="sm" icon={<FcHome />}>
                {`${location.house} ${location.street}, ${location.city}  ${location.zipcode}`}
              </MenuItem>
            </Link>
          ))}
        </>
      </MenuList>
    </Menu>
  )
}

export default LocationPicker
