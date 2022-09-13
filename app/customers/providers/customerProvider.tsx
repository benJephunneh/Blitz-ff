import { Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import ConfirmDeleteModal from "app/core/components/ConfirmDeleteModal"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import LocationModalForm from "app/locations/components/LocationModalForm"
import getLocations from "app/locations/queries/getLocations"
import { NotFoundError } from "blitz"
import db, { Customer } from "db"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { useState } from "react"
import CustomerDrawer from "../components/CustomerDrawer"
import CustomerModalForm from "../components/CustomerModalForm"
import customerContext from "../contexts/customerContext"
import useCustomer from "../hooks/useCustomer"
import deleteCustomer from "../mutations/deleteCustomer"
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
  const router = useRouter()
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [showingDetails, setShowingDetails] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)
  const [deletingCustomer, setDeletingCustomer] = useState(false)

  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    { id: customerId },
    {
      suspense: true,
      staleTime: Infinity,
    }
  )
  const [locations, { refetch: refetchLocations }] = useQuery(
    getLocations,
    { where: { customerId } },
    {
      suspense: false,
      enabled: false,
      refetchOnWindowFocus: false,
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  )

  const [deleteCustomerMutation] = useMutation(deleteCustomer)

  // const [customerOranizer, { refetch: refetchOrganizer }] = useQuery(getCustomerOrganizer, { id })
  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  return (
    <Provider
      value={{
        editCustomer: () => setEditingCustomer(true),
        deleteCustomer: () => setDeletingCustomer(true),
        showDetails: () => setShowingDetails(true),
        createLocation: () => setCreatingLocation(true),

        customer: customer as Customer,
        locations: locations?.locations,

        refetchCustomer,
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

      <ConfirmDeleteModal
        title={`Delete ${customer?.firstname} ${customer?.lastname}?`}
        description="Are you sure you want to delete this customer and their history?  All associated ocations, jobs, invoices, and estimates will also be deleted."
        isOpen={deletingCustomer}
        onClose={() => setDeletingCustomer(false)}
        onConfirm={async () => {
          await deleteCustomerMutation({ id: customer!.id }).then(() =>
            router.push(Routes.CustomersPage())
          )
        }}
      />

      <CustomerDrawer onClose={() => setShowingDetails(false)} isOpen={showingDetails} />

      {children}
    </Provider>
  )
}

export default CustomerProvider
