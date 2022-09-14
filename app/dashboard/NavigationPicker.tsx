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
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import getCustomer from "app/customers/queries/getCustomer"
import getLocation from "app/locations/queries/getLocation"
import db from "db"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import dashboardContext from "./dashboardContext"

type NavigationPickerProps = {
  icon: IconType
}

const NavigationPicker = ({ icon }: NavigationPickerProps) => {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const hoveredBg = useColorModeValue("blackAlpha.200", "initial")
  const normalBg = useColorModeValue("blackAlpha.100", "blackAlpha.400")
  const bg = hovered ? hoveredBg : normalBg
  const borderColor = useColorModeValue("gray.50", "blackAlpha.50")
  const { customerId } = useContext(dashboardContext)

  const [customer] = useQuery(
    getCustomer,
    { id: customerId },
    { suspense: false, refetchOnWindowFocus: false }
  )
  const [location] = useQuery(
    getLocation,
    { where: { id: customer?.id } },
    { suspense: false, refetchOnWindowFocus: false }
  )
  const links = [
    {
      name: "Schedule",
      href: "/schedule",
      isDisabled: true,
    },
    {
      name: "Customers",
      href: "/customers",
      isDisabled: false,
    },
    {
      name: "Locations",
      href: `/customers/${customer?.id}`,
      isDisabled: !customer?.id,
    },
    {
      name: "Invoices",
      href: `/customers/${customer?.id}/locations/${location?.id}/invoices`,
      isDisabled: !customer?.id || !location?.id,
    },
    {
      name: "Estimates",
      href: `/customers/${customer?.id}/locations/${location?.id}/estimates`,
      isDisabled: !customer?.id || !location?.id,
    },
  ]

  // window.alert(window.location.pathname)

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        size="sm"
        variant="outline"
        color={useColorModeValue("blackAlpha.700", "gray.300")}
        bgColor="transparent"
        borderColor={useColorModeValue("gray.100", "blackAlpha.50")}
        borderWidth={1}
        _hover={{
          bg: useColorModeValue("blackAlpha.200", "gray.800"),
          borderColor: useColorModeValue("gray.200", "blackAlpha.50"),
        }}
      >
        <HStack>
          <Icon as={icon} w={5} h={5} />
          <Heading size="sm">{router.pathname.split("/")}</Heading>
          <Icon as={FaChevronDown} w={3} h={3} />
        </HStack>
      </MenuButton>
      <MenuList>
        {links.map(({ name, href, isDisabled }, ii) => (
          <MenuItem key={ii} isDisabled={isDisabled}>
            <Link href={href} passHref>
              <Text as="a" fontWeight="semibold">
                {name}
              </Text>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default NavigationPicker
