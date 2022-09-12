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
import { useState } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"

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
  const [customer] = useQuery(
    getCustomer,
    { id: undefined },
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
    <Menu isLazy gutter={0}>
      <MenuButton
        as={Button}
        size="sm"
        px={1}
        variant="outline"
        color={useColorModeValue("blackAlpha.700", "gray.300")}
        bgColor={useColorModeValue("blackAlpha.100", "blackAlpha.400")}
        borderColor={useColorModeValue("gray.50", "blackAlpha.50")}
        borderWidth={2}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <HStack px={2}>
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
