import { Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import ConfirmDeleteModal from "app/core/components/ConfirmDeleteModal"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import LocationModalForm from "app/locations/components/LocationModalForm"
import getLocations from "app/locations/queries/getLocations"
import { NotFoundError } from "blitz"
import db, { Customer } from "db"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { useState } from "react"
import CustomerDrawer from "../components/CustomerDrawer"
import CustomerModalForm from "../components/CustomerModalForm"
import customerContext from "../contexts/customerContext"
import useCustomer from "../hooks/useCustomer"
import deleteCustomer from "../mutations/deleteCustomer"
import findCustomer from "../queries/findCustomer"
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
  children?: ReactNode
}

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [showingDetails, setShowingDetails] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)
  const [deletingCustomer, setDeletingCustomer] = useState(false)
  const [custId, setCustId] = useState(customerId)
  const [searchQuery, setSearchQuery] = useState("")

  const [searchResults, { refetch: refetchSearch }] = useQuery(
    findCustomer,
    { query: searchQuery },
    { suspense: false, enabled: !!searchQuery }
  )

  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    {
      where: {
        id: custId,
      },
    },
    {
      suspense: true,
      staleTime: Infinity,
    }
  )
  const [locations, { refetch: refetchLocations }] = useQuery(
    getLocations,
    { where: { customerId: custId } },
    {
      suspense: true,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  )

  const [deleteCustomerMutation] = useMutation(deleteCustomer)

  // const [customerOranizer, { refetch: refetchOrganizer }] = useQuery(getCustomerOrganizer, { id })
  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  let displayName = ""
  if (customer) {
    if (customer.firstname) {
      displayName = `${customer.firstname}`
      if (customer.lastname) {
        displayName.concat(` ${customer.lastname}`)
      }
    } else {
      displayName = `${customer.companyname}`
    }
  }

  console.log(`Customer: ${displayName}`)
  console.log(`Location[0]: ${JSON.stringify(locations?.locations[0])}`)

  return (
    <Provider
      value={{
        pickCustomer: (id) => setCustId(id),
        editCustomer: () => setEditingCustomer(true),
        deleteCustomer: () => setDeletingCustomer(true),
        showDetails: () => setShowingDetails(true),
        createLocation: () => setCreatingLocation(true),

        customer: customer as Customer,
        displayName: displayName,
        locations: locations?.locations,

        refetchCustomer,
        refetchLocations,
      }}
    >
      <CustomerModalForm
        customerId={custId}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={() => {
          refetchCustomer().catch((e) => console.log(e))
          setEditingCustomer(false)
        }}
      />

      <LocationModalForm
        customerId={custId!}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={(location) => {
          refetchCustomer().catch((e) => console.log(e))
          refetchLocations().catch((e) => console.log(e))
          setCreatingLocation(false)
          router
            .push(Routes.ShowLocationPage({ customerId: custId!, locationId: location.id }))
            .catch((e) => console.log(e))
        }}
      />

      <ConfirmDeleteModal
        title={`Delete ${customer?.firstname} ${customer?.lastname}?`}
        description="Are you sure you want to delete this customer and related history?  All associated locations, jobs, invoices, and estimates will also be deleted."
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
