import { setPublicDataForUser } from "@blitzjs/auth"
import { Routes, useParam, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  SimpleGrid,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import userContext from "app/auth/components/contexts/userContext"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import CustomerSearchResult from "app/customers/components/CustomerSearchResult"
import useCustomer from "app/customers/hooks/useCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import findCustomer from "app/customers/queries/findCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import JobModalForm from "app/jobs/components/JobModalForm"
import { Range } from "app/jobs/components/JobPanel"
import updateJob from "app/jobs/mutations/updateJob"
import getJob from "app/jobs/queries/getJob"
import getJobs from "app/jobs/queries/getJobs"
import LocationModalForm from "app/locations/components/LocationModalForm"
import LocationSearchResult from "app/locations/components/LocationSearchResult"
import updateLocation from "app/locations/mutations/updateLocation"
import findLocation from "app/locations/queries/findLocation"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import SearchInput from "app/search/SearchInput"
import SearchResults from "app/search/SearchResults"
import getStashes from "app/stashes/queries/getStashes"
import db, { Job, Location, StashType } from "db"
import { useRouter } from "next/router"
import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react"
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
  const customerId = useParam("customerId", "number")
  // const [customerId, setCustomerId] = useState<number>()
  // const fetchCustomerId = useCallback(async () => {
  //   // const { customerId: c } = router.query
  //   const c = Number(decodeURIComponent(router.query.customerId as string))
  //   setCustomerId(c)
  //   // return c
  // }, [router.query.customerId])
  // useEffect(() => {
  //   if (!router.isReady) return
  //   fetchCustomerId()
  //     .catch(console.error)
  // }, [router.isReady])
  // useEffect(() => {
  //   if (!router.isReady) return
  //   fetchCustomerId()
  //     .catch(console.error)
  // }, [router.isReady, fetchCustomerId])
  const [creatingCustomer, setCreatingCustomer] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [deletingCustomer, setDeletingCustomer] = useState(false)
  const [customerPhone, setCustomerPhone] = useState<string>()
  const [updateCustomerMutation] = useMutation(updateCustomer)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)

  // Location
  const [creatingLocation, setCreatingLocation] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [deletingLocation, setDeletingLocation] = useState(false)
  const [locationIds, setLocationIds] = useState<{ id: number }[]>()
  const [locationId, setLocationId] = useState<number>()
  const [updateLocationMutation] = useMutation(updateLocation)

  // Job
  const [creatingJob, setCreatingJob] = useState(false)
  const [editingJob, setEditingJob] = useState(false)
  const [deletingJob, setDeletingJob] = useState(false)
  const [jobId, setJobId] = useState<number>()
  const [updateJobMutation] = useMutation(updateJob)

  // Calendar
  const [weekNumber, setWeekNumber] = useState<number>()
  const [date, setDate] = useState<Date>()

  // Stashes
  const [stashId, setStashId] = useState<number>()
  const [stashType, setStashType] = useState<StashType>()
  const [editingStash, setEditingStash] = useState(false)

  // Data
  const [customer, { setQueryData: setCustomerQueryData, refetch: refetchCustomer }] = useQuery(
    getCustomer,
    { where: { id: customerId } },
    { enabled: !!customerId, refetchOnWindowFocus: false }
  )
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
      enabled: !!customerId,
      refetchOnWindowFocus: false,
    }
  )
  // const [location, { setQueryData: setLocationQueryData, refetch: refetchLocation }] = useQuery(
  //   getLocation, {
  //   where: { id: locationId }
  // }, {
  //   enabled: !!locationId,
  //   staleTime: Infinity,
  //   refetchOnWindowFocus: false,
  // })
  const [jobs, { refetch: refetchJobs }] = useQuery(
    getJobs,
    {
      where: { customerId: customerId },
      orderBy: { start: "asc" },
    },
    {
      enabled: !!customerId && !!locationId,
      refetchOnWindowFocus: false,
      // staleTime: Infinity,
    }
  )
  // const [job, { setQueryData: setJobQueryData, refetch: refetchJob }] = useQuery(
  //   getJob,
  //   { id: jobId },
  //   { enabled: !!jobId, suspense: !!jobId, staleTime: Infinity }
  // )

  useEffect(() => {
    refetchCustomer()
      .then(() => setJobId(undefined))
      .then(() => refetchLocations())
      .then(() => refetchJobs())
      .catch(console.error)
  }, [customerId]) // eslint-disable-line
  // useEffect(() => {
  //   const j =
  // })
  // useEffect(() => {
  //   refetchLocation()
  //     .then(() => setJobId(undefined))
  //     .then(() => refetchJobs())
  //     .catch(console.error)
  // }, [refetchLocation, refetchJobs, locationId])
  useEffect(() => {
    let ids: { id: number }[] = []
    if (locations) {
      ids = [...locations?.map(({ id }) => ({ id }))]
      setLocationId(ids.at(0)?.id)
    }
    setLocationIds(ids)
    setCustomerPhone(customer ? customer.phone : undefined)
  }, [customer, locations])
  useEffect(() => {
    setLocationId(locationIds?.length && locationIds.at(0)?.id)
  }, [customerId, locationIds])
  // useEffect(() => {
  //   // Can't have just any re-render changing chosen locationId.
  //   // if (!router.isReady) return
  //   async () => {
  //     let l = await db.location.findFirst({ where: { id: locationId } })
  //     setLocation(l)
  //   }
  //   // setLocation()
  //   // setLocation(locationIds?.length && locationIds.at(0)?.id)
  //   // console.log(`locationId (HeaderProvider): ${locationId}`)
  // }, [locationId]) // eslint-disable-line

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
      // staleTime: Infinity,
      refetchOnWindowFocus: false,
      // refetchInterval: 5000,
      // refetchIntervalInBackground: true,
    }
  )
  // Search
  const { isOpen: searchIsOpen, onOpen: openSearch, onClose: closeSearch } = useDisclosure()
  const searchField = useRef<any>()
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState("")
  const [customerSearchResults, { refetch: refetchCustomerSearch, isLoading }] = useQuery(
    findCustomer,
    { query },
    { suspense: false, enabled: !!query }
  )
  const [locationSearchResults, { refetch: refetchLocationSearch }] = useQuery(
    findLocation,
    { query },
    { suspense: false, enabled: !!query }
  )
  // useEffect(() => {
  //   ;async () => await refetchCustomerSearch()
  // }, [query])

  const deleteDescription = deletingCustomer
    ? "Are you sure you want to delete this customer and related history?  All associated locations, jobs, invoices, and estimates will also be deleted."
    : deletingLocation
    ? "Are you sure you want to delete this location and related history?  All associated jobs, invoices, and estimates will also be deleted."
    : deletingJob
    ? "Are you sure you want to delete this job and related history?  All associated invoices, and estimates will also be deleted."
    : ""

  return (
    <Provider
      value={{
        // gotoCustomer: (id) => router.push(Routes.ShowCustomerPage({ customerId: id })),
        createCustomer: () => {
          setStashId(undefined)
          setStashType(undefined)
          setCreatingCustomer(true)
        },
        editCustomer: () => setEditingCustomer(true),
        deleteCustomer: () => setDeletingCustomer(true),

        createLocation: () => setCreatingLocation(true),
        editLocation: () => setEditingLocation(true),
        deleteLocation: () => setDeletingLocation(true),
        pickLocation: (id) => {
          setLocationId(id)
          setJobId(undefined)
        },

        createJob: () => setCreatingJob(true),
        editJob: () => setEditingJob(true),
        deleteJob: () => setDeletingJob(true),
        pickJob: (id) => setJobId(id),

        editStash: (id, type) => {
          setStashId(id)
          setStashType(type)
          setEditingStash(true)
        },

        customerId,
        customer,
        locations,
        locationId,
        locationIds,
        jobId,
        jobs,
        customerStashes,
        locationStashes,
        jobStashes,
        // estimateStashes,
        // invoiceStashes,
        numStashes,

        // openSearch: () => setSearching(true),
        // search: (q: string) => setQuery(q),
        // searchResults,
        searchIsOpen,
        openSearch,
        closeSearch,

        refetchCustomer,
        refetchLocations,
        // refetchJob,
        refetchJobs,
        refetchStashes,
      }}
    >
      {isLoggedIn && (
        <>
          <CustomerModalForm
            // customerId={customerId}
            customer={editingCustomer ? customer : undefined}
            stashId={editingStash ? stashId : undefined}
            isOpen={
              creatingCustomer ||
              editingCustomer ||
              (stashType === "Customer" && editingStash && !!stashId)
            }
            onClose={() => {
              creatingCustomer && setCreatingCustomer(false)
              editingCustomer && setEditingCustomer(false)
              editingStash && setEditingStash(false)
            }}
            disableStash={editingCustomer}
            onSuccess={async (customer) => {
              if (customer) {
                if ("stashType" in customer) await refetchStashes()
                else {
                  await setCustomerQueryData(customer)
                  creatingCustomer && setLocationId(undefined)
                  creatingCustomer && setJobId(undefined)
                  editingStash && refetchStashes()
                  if (creatingCustomer)
                    await router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
                }
                // await refetchCustomer()
                //   .catch((e) =>
                //     console.log(`Header CustomerModalForm error: ${e}`)
                //   )
              }
              creatingCustomer && setCreatingCustomer(false)
              editingCustomer && setEditingCustomer(false)
              editingStash && setEditingStash(false)
            }}
          />

          <LocationModalForm
            customerId={editingStash ? undefined : customer?.id}
            customerPhone={customerPhone}
            // location={editingLocation ? location : undefined}
            locationId={editingLocation ? locationId : undefined}
            stashId={editingStash ? stashId : undefined}
            isOpen={
              creatingLocation ||
              editingLocation ||
              (stashType === "Location" && editingStash && !!stashId)
            }
            onClose={() => {
              creatingLocation && setCreatingLocation(false)
              editingLocation && setEditingLocation(false)
              editingStash && setEditingStash(false)
            }}
            disableStash={editingLocation}
            onSuccess={async (location) => {
              if (location) {
                if ("stashType" in location) await refetchStashes()
                else {
                  setLocationId(location.id)
                  setJobId(undefined)
                  if (editingStash)
                    await router.push(Routes.ShowCustomerPage({ customerId: location.customerId }))
                }
              }

              creatingLocation && setCreatingLocation(false)
              editingLocation && setEditingLocation(false)
              editingStash && setEditingStash(false)
            }}
          />

          <JobModalForm
            customerId={customerId}
            locationId={locationId}
            jobId={editingJob ? jobId : undefined}
            stashId={editingStash ? stashId : undefined}
            isOpen={creatingJob || editingJob || (stashType === "Job" && editingStash && !!stashId)}
            onClose={() => {
              creatingJob && setCreatingJob(false)
              editingJob && setEditingJob(false)
              editingStash && setEditingStash(false)
            }}
            disableStash={editingJob}
            onSuccess={async (job) => {
              if (job) {
                if ("stashType" in job) await refetchStashes()
                else {
                  await refetchJobs()
                  setJobId(job.id)
                  if (editingStash)
                    await router.push(Routes.ShowCustomerPage({ customerId: job.customerId }))
                }
              }

              creatingJob && setCreatingJob(false)
              editingJob && setEditingJob(false)
              editingStash && setEditingStash(false)
            }}
          />

          <ConfirmDeleteModal
            title={`Delete ${customer?.firstname} ${customer?.lastname} ? `}
            description={deleteDescription}
            isOpen={deletingCustomer}
            onClose={() => {
              deletingCustomer && setDeletingCustomer(false)
              deletingLocation && setDeletingLocation(false)
              deletingJob && setDeletingJob(false)
            }}
            onConfirm={async () => {
              await deleteCustomerMutation({ id: customer!.id })
              await refetchStashes()
              await router.push(Routes.CustomersPage())
            }}
          />

          <Drawer
            isOpen={searchIsOpen}
            onClose={closeSearch}
            placement="right"
            initialFocusRef={searchField}
            size="lg"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth={1}>Search...</DrawerHeader>

              <DrawerBody>
                <Stack spacing={8}>
                  <Box>
                    {/* <Input ref={searchField} placeholder="Enter search query..." /> */}
                    <SearchInput ref={searchField} search={setQuery} />
                  </Box>
                  {/* <Box>Results</Box> */}
                  <SearchResults
                    query={query}
                    items={customerSearchResults || []}
                    isLoading={isLoading}
                  >
                    <SimpleGrid columns={1} spacing={3}>
                      {customerSearchResults?.map((r, ii) => (
                        <CustomerSearchResult key={ii} customer={r} />
                      ))}
                      {locationSearchResults?.map((r, ii) => (
                        <LocationSearchResult key={ii} location={r} />
                      ))}
                    </SimpleGrid>
                  </SearchResults>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}

      {children}
    </Provider>
  )
}

export default HeaderProvider
