import { Routes, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import ConfirmDeleteModal from "app/core/components/ConfirmDeleteModal"
import headerContext from "app/core/components/header/headerContext"
import LocationModalForm from "app/locations/components/LocationModalForm"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import { Customer, Location } from "db"
import { useRouter } from "next/router"
import { ReactNode, useContext, useEffect } from "react"
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
  const { customer, pickLocation, locationId, refetchStashes } = useContext(headerContext)
  // const [location, setLocation] = useState<Location>()

  // Location
  // const [location, { refetch: refetchLocation }] = useQuery(
  //   getLocation,
  //   {
  //     where: { id: locationId },
  //   },
  //   {
  //     suspense: !!locationId,
  //     enabled: !!locationId,
  //     staleTime: Infinity,
  //     refetchOnWindowFocus: false,
  //   }
  // )
  const [locations, { refetch: refetchLocations }] = useQuery(
    getLocations,
    {
      where: { customerId: customer!.id },
      orderBy: { primary: "desc" },
    },
    {
      enabled: !!customer,
      refetchOnWindowFocus: false,
      // refetchInterval: 5000,
      staleTime: Infinity,
    }
  )

  // useEffect(() => {
  //   refetchLocation().catch((e) => console.log(e))
  // }, [locationId]) // eslint-disable-line
  // console.log(`location (customerProvider): ${JSON.stringify(location)}`)

  const [showingDetails, setShowingDetails] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)

  // Search
  const [searchParams, setSearchParams] = useState("")
  const [searchResults, { refetch: refetchSearch }] = useQuery(
    findCustomer,
    {
      query: searchParams,
    },
    {
      suspense: false,
      enabled: !!searchParams,
    }
  )

  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  return (
    <Provider
      value={{
        // pickCustomer: (id) => setCustomerId(id),
        // editCustomer: () => setEditingCustomer(true),
        // deleteCustomer: () => setDeletingCustomer(true),
        showDetails: () => setShowingDetails(true),
        // createLocation: () => setCreatingLocation(true),
        // pickLocation: (id) => setLocationId(id),
        gotoLocation: async (id) => {
          pickLocation(id)
          await router.push(Routes.ShowCustomerPage({ customerId: customer!.id }))
        },

        search: (p) => setSearchParams(p),
        searchParams,

        // customer: customer as Customer,
        // displayname: customer!.displayname,
        locations,
        // location,
        // locationId: locationId,

        // refetchCustomer,
        refetchLocations,
      }}
    >
      {/* <LocationModalForm
        customerId={customer!.id}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={(location) => {
          setCreatingLocation(false)
          if ("notes" in location) refetchStashes()
          else {
            pickLocation(location!.id)
            // refetchCustomer()
            router
              .push(Routes.ShowLocationPage({ customerId: customer!.id, locationId: location.id }))
              .catch((e) => console.log(`customerProvider LocationModal error: ${e}`))
          }
        }}
      /> */}

      <CustomerDrawer onClose={() => setShowingDetails(false)} isOpen={showingDetails} />

      {children}
    </Provider>
  )
}

export default CustomerProvider
