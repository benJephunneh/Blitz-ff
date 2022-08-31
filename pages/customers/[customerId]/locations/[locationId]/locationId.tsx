import { BlitzPage, useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Heading } from "@chakra-ui/react"
import SidebarLayout from "app/core/layouts/SideBarLayout"
import getCustomer from "app/customers/queries/getCustomer"
import LocationModalForm from "app/locations/components/LocationModalForm"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import { useRouter } from "next/router"
import { useState } from "react"

// Create transfer-ownership routine and button

const ITEMS_PER_PAGE = 20

type LocationPageProps = {
  customerId: number
}

const ShowLocationPage: BlitzPage = ({ customerId }: LocationPageProps) => {
  const router = useRouter()
  const locationId = useParam("locationId", "number")
  const [location] = useQuery(getLocation, { where: { id: locationId } })
  const [{ house, street, city, state, zipcode, block, lot, parcel, primary }] = useQuery(
    getLocation,
    { where: { id: location.customerId } }
  )
  const [creatingLocation, setCreatingLocation] = useState(false)
  const [{ firstname, lastname }] = useQuery(getCustomer, { where: { id: customerId } })
  const customerName = `${firstname} ${lastname}`

  return (
    <SidebarLayout title={`Location for ${customerName}`}>
      <Heading>{customerName}</Heading>

      <LocationModalForm
        customerId={customerId}
        locationId={locationId!}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
      />
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </SidebarLayout>
  )
}

export default ShowLocationPage
