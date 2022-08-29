import { BlitzPage, useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Heading } from "@chakra-ui/react"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import getCustomer from "app/customers/queries/getCustomer"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import { useState } from "react"

const ITEMS_PER_PAGE = 20

type LocationsPageProps = {
  customerId: number
}

export const ShowLocationsPage: BlitzPage = ({ customerId }: LocationsPageProps) => {
  const locationId = useParam("locationId", "number")
  const [location] = useQuery(getLocation, { where: { id: locationId } })
  const [{ firstname, lastname }] = useQuery(getCustomer, { where: { id: location.customerId } })
  const [creatingLocation, setCreatingLocation] = useState(false)
  const customerName = `${firstname} ${lastname}`

  return (
    <SidebarLayout title={`Location for ${customerName}`}>
      <Heading>{customerName}</Heading>

      <pre>{JSON.stringify(location, null, 2)}</pre>
    </SidebarLayout>
  )
}
