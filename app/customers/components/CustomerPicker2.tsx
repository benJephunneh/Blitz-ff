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
import headerContext from "app/core/components/header/headerContext"
import SearchInput from "app/search/searchInput"
import SearchInputMenu from "app/search/SearchInputMenu"
import SearchResults from "app/search/SearchResults"
import Link from "next/link"
import { useContext, useState } from "react"
import { IconType } from "react-icons"
import { BsSignpostSplit } from "react-icons/bs"
import { FaChevronDown } from "react-icons/fa"
import { FcBusinessman, FcList, FcManager, FcTimeline } from "react-icons/fc"
import customerContext from "../contexts/customerContext"
import findCustomer from "../queries/findCustomer"
import getCustomers from "../queries/getCustomers"

type CustomerPickerProps = {
  icon: IconType
}

const CustomerPicker2 = () => {
  const { customer, locations } = useContext(headerContext)
  const [query, setQuery] = useState("")
  const displayname = customer?.displayname

  // const [items, { isLoading }] = useQuery(
  //   findCustomer,
  //   { query },
  //   { suspense: false, enabled: !!query }
  // )

  // locations?.map((location) => {
  //   console.log(JSON.stringify(location))
  // })

  return (
    <HStack spacing={8} justify="left">
      <Menu isLazy>
        <MenuButton
          as={Button}
          size="sm"
          variant="ghost"
          px={1}
          rightIcon={
            <Icon color={useColorModeValue("cyan.400", "cyan.600")} pr={1} as={FaChevronDown} />
          }
          // zIndex={10}
        >
          <HStack>
            <Icon
              as={BsSignpostSplit}
              color={useColorModeValue("brown", "burlywood")}
              w={5}
              h={5}
            />
            <Heading size="sm" opacity="0.9">
              {displayname}
            </Heading>
          </HStack>
        </MenuButton>

        <MenuList>
          <MenuItem>{`Number of locations: ${locations?.length}`}</MenuItem>
          {locations?.map((location) => (
            <Link
              key={location.id}
              href={Routes.ShowLocationPage({ customerId: customer!.id, locationId: location.id })}
              passHref
            >
              <MenuItem as="a">
                {location.house} {location.street}, {location.city} {location.zipcode}
              </MenuItem>
            </Link>
          ))}
          {/* <SearchInputMenu setQuery={setQuery} /> */}
        </MenuList>
      </Menu>
      {/* <Link href={Routes.SearchPage()} passHref>
        <Text as="a" fontWeight="semibold">
          Search...
        </Text>
      </Link> */}
      {/* <SearchInput setQuery={setQuery} /> */}
    </HStack>
  )
}

export default CustomerPicker2
