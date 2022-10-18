import { useSession } from "@blitzjs/auth"
import { Routes, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import userContext from "app/auth/components/contexts/userContext"
import LoginUserModalForm from "app/auth/components/LoginUserModalForm"
import NewUserModalForm from "app/auth/components/NewUserModalForm"
import login from "app/auth/mutations/login"
import logout from "app/auth/mutations/logout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import JobModalForm from "app/jobs/components/JobModalForm"
import LocationModalForm from "app/locations/components/LocationModalForm"
import deleteLocation from "app/locations/mutations/deleteLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import createStash from "app/stashes/mutations/createStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import updateStash from "app/stashes/mutations/updateStash"
import getStashes from "app/stashes/queries/getStashes"
import db, { Customer, CustomerStash, JobStash, Location, LocationStash, StashType } from "db"
import { useRouter } from "next/router"
import { ReactNode, useContext, useEffect, useState } from "react"
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
  const { isLoggedIn, isLoggedOut } = useContext(userContext)

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

  // Job
  const [creatingJob, setCreatingJob] = useState(false)
  const [editingJob, setEditingJob] = useState(false)
  const [deletingJob, setDeletingJob] = useState(false)
  const [jobId, setJobId] = useState<number>()

  // Stash
  const [
    { customerStashes, locationStashes, jobStashes, count: numStashes },
    { refetch: refetchStashes },
  ] = useQuery(
    getStashes,
    {},
    {
      suspense: true,
      // enabled: isLoggedIn,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      // refetchInterval: 2000,
      // refetchIntervalInBackground: true,
    }
  )
  const [customerStash, setCustomerStash] = useState<CustomerStash>()
  const [locationStash, setLocationStash] = useState<LocationStash>()
  const [jobStash, setJobStash] = useState<JobStash>()
  const [stashId, setStashId] = useState<number>()
  const [stashType, setStashType] = useState<StashType>()
  const [editingStash, setEditingStash] = useState(false)
  // const [deletingStash, setDeletingStash] = useState(false)
  // const [createStashMutation] = useMutation(createStash)
  // const [updateStashMutation] = useMutation(updateStash)
  // const [deleteStashMutation] = useMutation(deleteStash)
  useEffect(() => {
    if (!editingStash) return

    switch (stashType) {
      case "Customer":
        setCustomerStash(customerStashes.find((c) => c.id === stashId))
        setEditingStash(true)
        break
      case "Location":
        setLocationStash(locationStashes.find((l) => l.id === stashId))
        setEditingStash(true)
        break
      case "Job":
        setJobStash(jobStashes.find((j) => j.id === stashId))
        setEditingStash(true)
        break

      default:
        setCustomerStash(undefined)
        setLocationStash(undefined)
        break
    }
  }, [customerStashes, editingStash, locationStashes, jobStashes, stashId, stashType])

  // const [loginMutation] = useMutation(login)
  // const [logoutMutation] = useMutation(logout)

  return (
    <Provider
      value={{
        // signUp: () => setSigningUp(true),
        // logIn: () => setLoggingIn(true),
        // logOut: () => logoutMutation(),
        // isLoggedIn,
        // isLoggedOut,

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

        createJob: () => setCreatingJob(true),
        pickJob: (id) => setJobId(id),
        editJob: () => setEditingJob(true),
        deleteJob: () => setDeletingJob(true),

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
        jobId,
        jobStashes,
        jobStash,
        // estimateStash,
        // invoiceStash,
        numStashes,

        // refetchCustomer,
        refetchCustomer,
        refetchStashes,
      }}
    >
      {/* <NewUserModalForm
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
      /> */}

      {isLoggedIn && (
        <>
          <CustomerModalForm
            // customerId={customerId}
            customer={editingCustomer ? customer : undefined}
            customerStash={editingStash ? customerStash : undefined}
            isOpen={creatingCustomer || editingCustomer || (editingStash && !!customerStash)}
            onClose={() => {
              creatingCustomer && setCreatingCustomer(false)
              editingCustomer && setEditingCustomer(false)
              editingStash && setEditingStash(false)
            }}
            disableStash={editingCustomer}
            onSuccess={async (customer) => {
              if (customer) {
                if ("stashType" in customer) await refetchStashes()
                else if (creatingCustomer) {
                  setLocationId(undefined)
                  await router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
                } else if (editingCustomer) await refetchCustomer()
              }
              // await refetchCustomer()
              //   .catch((e) =>
              //     console.log(`Header CustomerModalForm error: ${e}`)
              //   )
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
            isOpen={creatingLocation || editingLocation || (editingStash && !!locationStash)}
            onClose={() => {
              creatingLocation && setCreatingLocation(false)
              editingLocation && setEditingLocation(false)
              editingStash && setEditingStash(false)
            }}
            disableStash={editingLocation}
            onSuccess={async (location) => {
              if ("stashType" in location) await refetchStashes()
              else if (creatingLocation) {
                setLocationId(location.id)
              }
              // refetchCustomer()
              // router
              //   .push(Routes.ShowLocationPage({ customerId: customer!.id, locationId: location.id }))
              //   .catch((e) => console.log(`customerProvider LocationModal error: ${e}`))

              creatingLocation && setCreatingLocation(false)
              editingLocation && setEditingLocation(false)
              editingStash && setEditingStash(false)
            }}
          />

          <JobModalForm
            locationId={locationId}
            job={editingJob ? job : undefined}
            jobStash={jobStash}
            isOpen={creatingJob || editingJob}
            onClose={() => {
              creatingJob && setCreatingJob(false)
              editingJob && setEditingJob(false)
            }}
            disableStash={editingJob}
            onSuccess={async (job) => {
              if (job) {
                if ("stashType" in job) await refetchStashes()
                else if (creatingJob) {
                  setJobId(job.id)
                  // await refetchJobs()
                }
              }

              creatingJob && setCreatingJob(false)
              editingJob && setEditingJob(false)
            }}
          />

          <ConfirmDeleteModal
            title={`Delete ${customer?.firstname} ${customer?.lastname} ? `}
            description="Are you sure you want to delete this customer and related history?  All associated locations, jobs, invoices, and estimates will also be deleted."
            isOpen={deletingCustomer}
            onClose={() => {
              deletingCustomer && setDeletingCustomer(false)
              deletingLocation && setDeletingLocation(false)
              deletingJob && setDeletingJob(false)
            }}
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
