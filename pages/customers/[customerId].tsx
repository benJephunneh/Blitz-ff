import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import LocationList, { LocationEntry } from "app/locations/components/LocationList"
import {
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react"
import { PromiseReturnType } from "blitz"
import createLocation from "app/locations/mutations/createLocation"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { FcGlobe } from "react-icons/fc"
import { FaChevronDown } from "react-icons/fa"
import { Customer } from "@prisma/client"
import { customerId } from "app/locations/validations"

export function MakeSerializable(c: Customer) {
  return JSON.parse(JSON.stringify(c))
}

export const CustomerDisplay = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(
    getCustomer,
    { where: { id: customerId }, include: { locations: true } },
    { suspense: false }
  )
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  // const c = MakeSerializable(customer)

  // if (Array.isArray(customer.locations)) {
  //   console.log('yay')
  // }

  return (
    <>
      <div>
        <Heading>
          {customer?.firstname} {customer?.lastname}
        </Heading>
        <pre>{JSON.stringify(customer, null, 2)}</pre>

        {/*
        <pre>{JSON.stringify(c, null, 2)}</pre>
        <pre>{JSON.stringify(locations, null, 2)}</pre>
        <ul>
          {locations.map((location) => {
            <li>{location.city}</li>
          })}
        </ul>

        <pre>{JSON.stringify(locations![0], null, 2)}</pre>
        <Menu>
          <MenuButton as={Button} rightIcon={<FaChevronDown />}>
            Locations
          </MenuButton>
          {customer?.locations.length > 0 &&
            <MenuList>
              <LocationEntry location={customer[locations]?.locations} />
              {/*
            <LocationList tag="asdf" customerId={customer?.id} />
            </MenuList>
          }
        </Menu>
        */}

        {/*
        <Link href={Routes.EditCustomerPage({ customerId: customer!.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCustomerMutation({ id: customer!.id }).then(() =>
                router.push(Routes.CustomersPage())
              )
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
        */}
      </div>
    </>
  )
}

const ShowCustomerPage = () => {
  return (
    <>
      <CustomerDisplay />
    </>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>

export default ShowCustomerPage
