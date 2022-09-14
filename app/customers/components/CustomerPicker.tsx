import { Routes } from "@blitzjs/next"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react"
import dashboardContext from "app/dashboard/dashboardContext"
import SearchInput from "app/search/SearchInput"
import Link from "next/link"
import { useContext, useState } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import { FcList, FcManager, FcTimeline } from "react-icons/fc"
import customerContext from "../contexts/customerContext"
import getCustomer from "../queries/getCustomer"
import getCustomers from "../queries/getCustomers"

type CustomerPickerProps = {
  icon: IconType
}

const CustomerPicker = () => {
  const [{ customers, count }] = usePaginatedQuery(
    getCustomers,
    { orderBy: { lastname: "asc" } },
    { suspense: true }
  )
  const { customer } = useContext(customerContext)
  const [query, setQuery] = useState("")

  const tempArray = [1, 2, 3]

  return (
    <HStack>
      <Menu isLazy>
        <MenuButton
          as={Button}
          size="sm"
          variant="ghost"
          px={1}
          rightIcon={<Icon pr={1} as={FaChevronDown} />}
        >
          <HStack>
            <Icon as={FcManager} w={5} h={5} />
            <Heading size="sm">
              {customer?.firstname} {customer?.lastname}
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
      <Box
        bg={useColorModeValue("gray.50", "gray.100")}
        textColor="black"
        fontWeight="semibold"
        borderRadius={12}
      >
        <SearchInput setQuery={setQuery} />
      </Box>
    </HStack>
  )
}

export default CustomerPicker
