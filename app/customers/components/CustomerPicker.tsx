import { Routes } from "@blitzjs/next"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
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
import Link from "next/link"
import { useContext } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import { FcList, FcTimeline } from "react-icons/fc"
import customerContext from "../contexts/customerContext"
import getCustomers from "../queries/getCustomers"

type CustomerPickerProps = {
  icon: IconType
}

const CustomerPicker = ({ icon }: CustomerPickerProps) => {
  const [{ customers, count }] = usePaginatedQuery(
    getCustomers,
    { orderBy: { lastname: "asc" } },
    { suspense: true }
  )
  const { customer } = useContext(customerContext)

  const tempArray = [1, 2, 3]

  return (
    <Menu isLazy>
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
        {/* <Link href={Routes.CustomersPage()} passHref>
          <MenuItem as="a" icon={<FcList />}>
            Customers
          </MenuItem>
        </Link> */}
        <MenuItem>Customers array length: {customers.length}</MenuItem>
        <MenuItem>Customers count: {count}</MenuItem>

        {tempArray.map((e, ii) => (
          <MenuItem key={ii}>{e}</MenuItem>
        ))}

        {customers.map((customer, ii) => (
          <MenuItem key={customer.id}>{customer.firstname}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CustomerPicker
