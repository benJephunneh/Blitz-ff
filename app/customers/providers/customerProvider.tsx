import { useQuery } from "@blitzjs/rpc"
import LocationModalForm from "app/locations/components/LocationModalForm"
import getLocations from "app/locations/queries/getLocations"
import { NotFoundError } from "blitz"
import db from "db"
import { ReactNode } from "react"
import { useState } from "react"
import CustomerDrawer from "../components/CustomerDrawer"
import CustomerModalForm from "../components/CustomerModalForm"
import customerContext from "../contexts/customerContext"
import getCustomer from "../queries/getCustomer"

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

const { Provider } = customerContext

type CustomerProviderProps = {
  customerId: number
  children?: ReactNode
}

const CustomerProvider = ({ customerId, children }: CustomerProviderProps) => {
  // const [customer, { refetch: refetchCustomer }] = useCustomer({ id, suspense: false })

  const [editingCustomer, setEditingCustomer] = useState(false)
  const [showingDetails, setShowingDetails] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)

  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    { id: customerId },
    { enabled: true }
  )
  const [{ locations }, { refetch: refetchLocations }] = useQuery(getLocations, {
    where: { customerId },
  })

  // const [customerOranizer, { refetch: refetchOrganizer }] = useQuery(getCustomerOrganizer, { id })
  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  return (
    <Provider
      value={{
        editCustomer: () => setEditingCustomer(true),
        showDetails: () => setShowingDetails(true),
        createLocation: () => setCreatingLocation(true),

        customer: customer,
        locations: locations,

        refetchLocations,
      }}
    >
      <CustomerModalForm
        customerId={customerId}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={() => {
          refetchCustomer().catch((e) => console.log(e))
          setEditingCustomer(false)
        }}
      />

      <LocationModalForm
        customerId={customerId}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={() => {
          refetchCustomer().catch((e) => console.log(e))
          refetchLocations().catch((e) => console.log(e))
          setCreatingLocation(false)
        }}
      />

      <CustomerDrawer onClose={() => setShowingDetails(false)} isOpen={showingDetails} />

      {children}
    </Provider>
  )
}

export default CustomerProvider
