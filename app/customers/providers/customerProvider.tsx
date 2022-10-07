import { Routes, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import ConfirmDeleteModal from "app/core/components/ConfirmDeleteModal"
import headerContext from "app/core/components/header/headerContext"
import LocationModalForm from "app/locations/components/LocationModalForm"
import getLocations from "app/locations/queries/getLocations"
import { Customer } from "db"
import { useRouter } from "next/router"
import { ReactNode, useContext } from "react"
import { useState } from "react"
import CustomerDrawer from "../components/CustomerDrawer"
import CustomerModalForm from "../components/CustomerModalForm"
import customerContext from "../contexts/customerContext"
import deleteCustomer from "../mutations/deleteCustomer"
import updateCustomer from "../mutations/updateCustomer"
import findCustomer from "../queries/findCustomer"
import getCustomer from "../queries/getCustomer"

const { Provider } = customerContext
type CustomerProviderProps = {
  children?: ReactNode
}

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const router = useRouter()
  const { customer } = useContext(headerContext)
  const [locations, { refetch: refetchLocations }] = useQuery(
    getLocations,
    {
      where: { customerId: customer!.id },
    },
    {
      enabled: !!customer,
      refetchOnWindowFocus: false,
    }
  )

  const [showingDetails, setShowingDetails] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [searchResults, { refetch: refetchSearch }] = useQuery(
    findCustomer,
    { query: searchQuery },
    { suspense: false, enabled: !!searchQuery }
  )

  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  // let displayName = ""
  // if (customer) {
  //   if (customer.firstname) {
  //     displayName = `${customer.firstname}`
  //     if (customer.lastname) {
  //       displayName.concat(` ${customer.lastname}`)
  //     }
  //   } else {
  //     displayName = `${customer.companyname}`
  //   }
  // }

  // console.log(`Customer: ${customer.displayname}`)
  // console.log(`Location[0]: ${JSON.stringify(locations?.at(0))}`)

  return (
    <Provider
      value={{
        // pickCustomer: (id) => setCustomerId(id),
        // editCustomer: () => setEditingCustomer(true),
        // deleteCustomer: () => setDeletingCustomer(true),
        showDetails: () => setShowingDetails(true),
        createLocation: () => setCreatingLocation(true),
        // pickLocation: (id) => setLocationId(id),
        gotoLocation: async (id) =>
          await router.push(Routes.ShowLocationPage({ customerId: customer!.id, locationId: id })),

        // customer: customer as Customer,
        // displayname: customer!.displayname,
        locations: locations,
        // locationId: locationId,

        // refetchCustomer,
        refetchLocations,
      }}
    >
      <LocationModalForm
        customerId={customer!.id}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={(location) => {
          setCreatingLocation(false)
          // refetchCustomer()
          router
            .push(Routes.ShowLocationPage({ customerId: customer!.id, locationId: location!.id }))
            .catch((e) => console.log(`customerProvider LocationModal error: ${e}`))
        }}
      />

      <CustomerDrawer onClose={() => setShowingDetails(false)} isOpen={showingDetails} />

      {children}
    </Provider>
  )
}

export default CustomerProvider
