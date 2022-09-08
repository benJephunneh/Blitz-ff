import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
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
  const [customers] = useQuery(getCustomers, { orderBy: { lastname: "asc" } }, { suspense: false })
  const { customer } = useContext(customerContext)

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
          <Link href={Routes.CustomersPage()} passHref>
            <MenuItem as="a" icon={<FcList />}>
              Customers
            </MenuItem>
          </Link>

          {!!customers?.customers.length && <MenuDivider />}

          {customers?.customers.map((customer) => {
            ;<Link
              key={customer.id}
              href={Routes.ShowCustomerPage({ customerId: customer.id })}
              passHref
            >
              <MenuItem as="a" icon={<FcTimeline />}>
                {`${customer.firstname} ${customer.lastname}`}
              </MenuItem>
            </Link>
          })}
        </>
      </MenuList>
    </Menu>
  )
}

export default CustomerPicker
