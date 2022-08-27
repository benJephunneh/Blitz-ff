import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import {
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
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

type LocationProp = { location: PromiseReturnType<typeof createLocation> }

const MapLinkIcon = ({ location }: LocationProp) => {
  const router = useRouter()

  return (
    <IconButton
      aria-label="Link to Google map"
      icon={<FcGlobe />}
      onClick={() =>
        router.push(
          `http://maps.google.com/maps?q=${location.house} ${location.street} ${location.city},${location.state}`
        )
      }
    />
  )
}

const LocationEntry = ({ location }: LocationProp) => {
  return (
    <HStack>
      <Text>
        {location.house} {location.street}, {location.city} {location.zipcode}
      </Text>
      <Tag colorScheme="orange" size="sm">
        <TagLabel>{location.parcel}</TagLabel>
      </Tag>
      <MapLinkIcon location={location} />
    </HStack>
  )
}

export const LocationList = ({ customerId }: { customerId: number }) => {
  const router = useRouter()
  const [location] = useQuery(getLocation, { customerId, primary: true })
  const [{ locations }] = useQuery(getLocations, { where: { customerId, primary: false } })

  return <>{location && <LocationEntry location={location} />}</>
}
// locations.map((location) => (
//   <LocationEntry location={location} />
// ))

export const Customer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(getCustomer, { id: customerId }, { suspense: false })
  const [deleteCustomerMutation] = useMutation(deleteCustomer)

  return (
    <>
      <div>
        <Heading>
          {customer?.firstname} {customer?.lastname}
        </Heading>

        <Menu>
          <MenuList>
            <LocationList customerId={customer!.id} />
          </MenuList>
        </Menu>

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
      </div>
    </>
  )
}

const ShowCustomerPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Customer />
      </Suspense>
    </>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>

export default ShowCustomerPage
