import { Routes } from "@blitzjs/next"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import SearchInput from "app/search/SearchInput"
import SearchInputMenu from "app/search/SearchInputMenu"
import SearchResults from "app/search/SearchResults"
import Link from "next/link"
import { useContext, useState } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import { FcBusinessman, FcList, FcManager, FcTimeline } from "react-icons/fc"
import customerContext from "../contexts/customerContext"
import findCustomer from "../queries/findCustomer"
import getCustomers from "../queries/getCustomers"

type CustomerPickerProps = {
  icon: IconType
}

const CustomerPicker2 = () => {
  const { customer } = useContext(customerContext)
  const [query, setQuery] = useState("")

  const [items, { isLoading }] = useQuery(
    findCustomer,
    { query },
    { suspense: false, enabled: !!query }
  )

  return (
    <HStack spacing={8} justify="left">
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
              {customer.firstname} {customer.lastname}
            </Heading>
          </HStack>
        </MenuButton>

        <MenuList>
          <SearchInputMenu setQuery={setQuery} />
        </MenuList>
      </Menu>
      <Link href={Routes.SearchPage()} passHref>
        <Text as="a" fontWeight="semibold">
          Search...
        </Text>
      </Link>
      {/* <SearchInput setQuery={setQuery} /> */}
    </HStack>
  )
}

export default CustomerPicker2
