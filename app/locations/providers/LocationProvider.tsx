import { useMutation, useQuery } from "@blitzjs/rpc"
import headerContext from "app/core/components/header/headerContext"
import getCustomer from "app/customers/queries/getCustomer"
import LocationModalForm from "app/locations/components/LocationModalForm"
import getLocations from "app/locations/queries/getLocations"
import { NotFoundError } from "blitz"
import db, { Location } from "db"
import { ReactNode, useContext, useEffect } from "react"
import { useState } from "react"
import JobDrawer from "../components/LocationDrawer"
import locationContext from "../contexts/locationContext"
import deleteLocation from "../mutations/deleteLocation"
import getLocation from "../queries/getLocation"

const { Provider } = locationContext

type LocationProviderProps = {
  children?: ReactNode
}

const LocationProvider = ({ children }: LocationProviderProps) => {
  const { customer, locationId, pickLocation, deleteLocation } = useContext(headerContext)

  const [creatingLocation, setCreatingLocation] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [deletingLocation, setDeletingLocation] = useState(false)
  const [showingDetails, setShowingDetails] = useState(false)
  const [locationIds, setLocationIds] = useState<[{ id: number }]>()

  const [location, setLocation] = useState<Location>()
  const [locations, { refetch: refetchLocations }] = useQuery(
    getLocations,
    {
      where: { customerId: customer?.id },
      orderBy: [
        { primary: "desc" },
        { zipcode: "asc" },
        { city: "asc" },
        { street: "asc" },
        { house: "asc" },
      ],
    },
    {
      refetchOnWindowFocus: false,
    }
  )
  useEffect(() => {
    const l = locations?.find((l) => l.id === locationId)
    console.log("LocationProvider useEffect location:")
    console.table({ l })
    setLocation(l)
  }, [locationId]) // eslint-disable-line

  const deleteDescription =
    "Are you sure you want to delete this location and related history?  All associated jobs, invoices, and estimates will also be deleted."

  // const [customerOranizer, { refetch: refetchOrganizer }] = useQuery(getCustomerOrganizer, { id })
  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  return (
    <Provider
      value={{
        // pickLocation: (id) => setLocationId(id),
        editLocation: () => setEditingLocation(true),
        // deleteLocation: () => setDeletingLocation(true),
        showDetails: () => setShowingDetails(true),
        createLocation: () => setEditingLocation(true),

        location,
        locations,

        refetchLocations,
      }}
    >
      <LocationModalForm
        customerId={customer?.id}
        customerPhone={customer?.phone}
        // location={editingLocation ? location : undefined}
        locationId={editingLocation ? locationId : undefined}
        isOpen={creatingLocation || editingLocation}
        onClose={() => {
          creatingLocation && setCreatingLocation(false)
          editingLocation && setEditingLocation(false)
        }}
        disableStash={editingLocation}
        onSuccess={async (location) => {
          if (location) {
            // await refetchCustomer()
            await refetchLocations()
              .then(() => pickLocation(location.id))
              .catch(console.error)
          }

          creatingLocation && setCreatingLocation(false)
          editingLocation && setEditingLocation(false)
        }}
      />

      <JobDrawer onClose={() => setShowingDetails(false)} isOpen={showingDetails} />

      {children}
    </Provider>
  )
}

export default LocationProvider
