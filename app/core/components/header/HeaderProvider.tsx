import { useSession } from "@blitzjs/auth"
import { Routes, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import LoginUserModalForm from "app/auth/components/LoginUserModalForm"
import NewUserModalForm from "app/auth/components/NewUserModalForm"
import login from "app/auth/mutations/login"
import logout from "app/auth/mutations/logout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import LocationModalForm from "app/locations/components/LocationModalForm"
import deleteLocation from "app/locations/mutations/deleteLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import createStash from "app/stashes/mutations/createStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import updateStash from "app/stashes/mutations/updateStash"
import getStashes from "app/stashes/queries/getStashes"
import db, { Customer, CustomerStash, Location, LocationStash, StashType } from "db"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import ConfirmDeleteModal from "../ConfirmDeleteModal"
import headerContext from "./headerContext"

const { Provider } = headerContext

type HeaderProviderProps = {
  children?: ReactNode
}

type StashProps = {
  customerId?: number
  locationId?: number
  jobId?: number
  invoiceId?: number
  estimateId?: number
}

const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const router = useRouter()

  // User
  const session = useSession({ suspense: false })
  const isLoggedIn = !!session.userId
  const [loggingIn, setLoggingIn] = useState(false)
  const [signingUp, setSigningUp] = useState(false)

  // Customer
  const { customerId } = useParams("number")
  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    {
      where: { id: customerId },
      include: {
        locations: {
          select: { id: true },
          orderBy: { primary: "desc" },
        },
      },
    },
    {
      enabled: !!customerId,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )

  const [creatingCustomer, setCreatingCustomer] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [deletingCustomer, setDeletingCustomer] = useState(false)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)

  // Location
  const [creatingLocation, setCreatingLocation] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [deletingLocation, setDeletingLocation] = useState(false)
  const updateLocationMutation = useMutation(updateLocation)
  const deleteLocationMutation = useMutation(deleteLocation)
  const [locationIds, setLocationIds] = useState<[{ id: number }]>()
  const [locationId, setLocationId] = useState<number>()
  // const [location, setLocation] = useState<Location>()
  useEffect(() => {
    setLocationIds(customer ? customer["locations"] : [])
  }, [customer])
  useEffect(() => {
    setLocationId(locationIds?.length && locationIds.at(0)?.id)
  }, [customerId, locationIds])
  // useEffect(() => {
  //   // Can't have just any re-render changing chosen locationId.
  //   // if (!router.isReady) return
  //   async () => {
  //     let l = await db.location.findFirstOrThrow({ where: { id: locationId } })
  //     setLocation(l)
  //   }
  //   // setLocation()
  //   // setLocation(locationIds?.length && locationIds.at(0)?.id)
  //   // console.log(`locationId (HeaderProvider): ${locationId}`)
  // }, [locationId]) // eslint-disable-line

  // Stash
  const [{ customerStashes, locationStashes, count: numStashes }, { refetch: refetchStashes }] =
    useQuery(
      getStashes,
      {},
      {
        suspense: true,
        staleTime: Infinity,
        // enabled: true,
        refetchOnWindowFocus: false,
        // refetchInterval: 2000,
        // refetchIntervalInBackground: true,
      }
    )
  const [stashId, setStashId] = useState<number>()
  const [stashType, setStashType] = useState<StashType>()
  const [editingStash, setEditingStash] = useState(false)
  const [deletingStash, setDeletingStash] = useState(false)
  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)
  const [customerStash, setCustomerStash] = useState<CustomerStash>()
  const [locationStash, setLocationStash] = useState<LocationStash>()
  useEffect(() => {
    if (!setEditingStash) return

    switch (stashType) {
      case "Customer":
        setCustomerStash(customerStashes.find((cs) => cs.id === stashId))
        // setEditingStash(true)
        break
      case "Location":
        setLocationStash(locationStashes.find((ls) => ls.id === stashId))
        // setEditingStash(true)
        break

      default:
        setCustomerStash(undefined)
        setLocationStash(undefined)
        break
    }
  }, [customerStashes, editingStash, locationStashes, stashId, stashType])

  const [loginMutation] = useMutation(login)
  const [logoutMutation] = useMutation(logout)

  return (
    <Provider
      value={{
        signUp: () => setSigningUp(true),
        logIn: () => setLoggingIn(true),
        logOut: () => logoutMutation(),
        // gotoCustomer: (id) => router.push(Routes.ShowCustomerPage({ customerId: id })),
        createCustomer: async () => {
          setStashId(undefined)
          setStashType(undefined)
          setCreatingCustomer(true)
        },
        editCustomer: () => setEditingCustomer(true),
        deleteCustomer: () => setDeletingCustomer(true),

        createLocation: () => setCreatingLocation(true),
        editLocation: () => setEditingLocation(true),
        deleteLocation: () => setDeletingLocation(true),
        pickLocation: (id) => setLocationId(id),

        editStash: (id, type) => {
          setStashId(id)
          setStashType(type)
          setEditingStash(true)
        },

        customer,
        // location,
        locationId,
        locationIds,
        customerStashes,
        locationStashes,
        numStashes,

        // refetchCustomer,
        refetchCustomer,
        refetchStashes,
      }}
    >
      <NewUserModalForm
        isOpen={signingUp}
        onClose={() => setSigningUp(false)}
        onSuccess={async () => {
          await router.push(Routes.Dashboard())
        }}
      />

      <LoginUserModalForm
        isOpen={loggingIn}
        onClose={() => setLoggingIn(false)}
        onSuccess={async () => {
          await router.push(Routes.Dashboard())
        }}
      />

      {isLoggedIn && (
        <>
          <CustomerModalForm
            // customerId={customerId}
            customer={editingCustomer ? customer : undefined}
            customerStash={customerStash}
            isOpen={creatingCustomer || editingCustomer || editingStash}
            onClose={() => {
              creatingCustomer && setCreatingCustomer(false)
              editingCustomer && setEditingCustomer(false)
              editingStash && setEditingStash(false)
            }}
            // disableStash={true}
            onSuccess={async (customer) => {
              if (customer) {
                if ("notes" in customer) await refetchStashes()
                else {
                  if (creatingCustomer) {
                    setLocationId(undefined)
                    await router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
                  }
                  editingCustomer && (await refetchCustomer())
                  // await refetchCustomer()
                  //   .catch((e) =>
                  //     console.log(`Header CustomerModalForm error: ${e}`)
                  //   )
                }
              }
              creatingCustomer && setCreatingCustomer(false)
              editingCustomer && setEditingCustomer(false)
              editingStash && setEditingStash(false)
            }}
          />

          <LocationModalForm
            customerId={customer?.id}
            // location={editingLocation ? location : undefined}
            locationId={creatingLocation ? undefined : locationId}
            locationStash={editingStash ? locationStash : undefined}
            isOpen={creatingLocation || editingLocation || editingStash}
            onClose={() => {
              creatingLocation && setCreatingLocation(false)
              editingLocation && setEditingLocation(false)
              editingStash && setEditingStash(false)
            }}
            onSuccess={(location) => {
              setCreatingLocation(false)
              if ("notes" in location) {
                refetchStashes().catch((e) => console.log(e))
              } else {
                setLocationId(location.id)
                // refetchCustomer()
                // router
                //   .push(Routes.ShowLocationPage({ customerId: customer!.id, locationId: location.id }))
                //   .catch((e) => console.log(`customerProvider LocationModal error: ${e}`))
              }
            }}
          />

          <ConfirmDeleteModal
            title={`Delete ${customer?.firstname} ${customer?.lastname} ? `}
            description="Are you sure you want to delete this customer and related history?  All associated locations, jobs, invoices, and estimates will also be deleted."
            isOpen={deletingCustomer}
            onClose={() => setDeletingCustomer(false)}
            onConfirm={async () => {
              await deleteCustomerMutation({ id: customer!.id })
                .then(() => router.push(Routes.CustomersPage()))
                .catch((e) => console.log(`customerProvider DeleteModal error: ${e}`))
            }}
          />
        </>
      )}

      {children}
    </Provider>
  )
}

export default HeaderProvider
