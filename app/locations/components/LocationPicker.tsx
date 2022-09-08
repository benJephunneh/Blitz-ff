import { Routes } from "@blitzjs/next"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import {
  Button,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import customerContext from "app/customers/contexts/customerContext"
import Link from "next/link"
import { useContext } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import { FcAlphabeticalSortingAz, FcHome, FcList, FcTimeline } from "react-icons/fc"
import getLocations from "../queries/getLocations"

type LocationPickerProps = {
  icon: IconType
}

const LocationPicker = ({ icon }: LocationPickerProps) => {
  const { customer } = useContext(customerContext)
  const [{ locations }] = useQuery(
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
    { suspense: true }
  )

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        px={1}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
        isTruncated
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
          {locations.map((location) => (
            <Link
              key={location.id}
              href={Routes.ShowLocationPage({ customerId: customer.id, locationId: location.id })}
              passHref
            >
              <MenuItem as="a" icon={<FcHome />}>
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
