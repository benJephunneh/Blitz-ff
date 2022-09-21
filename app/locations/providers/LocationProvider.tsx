import { useQuery } from "@blitzjs/rpc"
import getCustomer from "app/customers/queries/getCustomer"
import LocationModalForm from "app/locations/components/LocationModalForm"
import getLocations from "app/locations/queries/getLocations"
import { NotFoundError } from "blitz"
import db from "db"
import { ReactNode } from "react"
import { useState } from "react"
import JobDrawer from "../components/LocationDrawer"
import locationContext from "../contexts/LocationContext"
import getLocation from "../queries/getLocation"

const fetchLocations = async (customerId: number) => {
  const locations = await db.location.findMany({
    where: { customerId },
    orderBy: [
      { primary: "asc" },
      { zipcode: "asc" },
      { city: "asc" },
      { street: "asc" },
      { house: "asc" },
    ],
  })

  return locations
}

const fetchCustomer = async (customerId: number) => {
  const customer = await db.customer.findFirst({
    where: { id: customerId },
  })

  if (!customer) throw new NotFoundError()

  return customer
}

const { Provider } = locationContext

type LocationProviderProps = {
  customerId: number
  locationId: number
  children?: ReactNode
}

const LocationProvider = ({ customerId, locationId, children }: LocationProviderProps) => {
  // const [customer, { refetch: refetchCustomer }] = useCustomer({ id, suspense: false })

  const [editingLocation, setEditingLocation] = useState(false)
  const [showingDetails, setShowingDetails] = useState(false)

  // const [customer, { refetch: refetchCustomer }] = useQuery(
  //   getCustomer, {
  //   where: {
  //     id: customerId
  //   },
  //   include: {
  //     locations: true
  //   }
  // }, {
  //   enabled: true
  // })
  // const locations = customer.locations

  const [location, { refetch: refetchLocation }] = useQuery(
    getLocation,
    {
      where: {
        id: locationId,
      },
    },
    {
      suspense: false,
    }
  )

  // const [customerOranizer, { refetch: refetchOrganizer }] = useQuery(getCustomerOrganizer, { id })
  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  return (
    <Provider
      value={{
        editLocation: () => setEditingLocation(true),
        showDetails: () => setShowingDetails(true),
        createLocation: () => setEditingLocation(true),

        location: location,

        refetchLocation,
      }}
    >
      <LocationModalForm
        customerId={customerId}
        isOpen={editingLocation}
        onClose={() => setEditingLocation(false)}
        onSuccess={() => {
          refetchLocation().catch((e) => console.log(`LocationProvider modal error: ${e}`))
          setEditingLocation(false)
        }}
      />

      <JobDrawer onClose={() => setShowingDetails(false)} isOpen={showingDetails} />

      {children}
    </Provider>
  )
}

export default LocationProvider
