import { useQuery } from "@blitzjs/rpc"
import getCustomer from "app/customers/queries/getCustomer"
import { NotFoundError } from "blitz"
import db from "db"
import { ReactNode } from "react"
import { useState } from "react"
import JobDrawer from "../components/JobDrawer"
import jobContext from "../contexts/JobContext"

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

const { Provider } = jobContext

type JobProviderProps = {
  locationId: number
  jobId: number
  children?: ReactNode
}

const JobProvider = ({ locationId, jobId, children }: JobProviderProps) => {
  // const [customer, { refetch: refetchCustomer }] = useCustomer({ id, suspense: false })

  const [editingJob, setEditingJob] = useState(false)
  const [showingDetails, setShowingDetails] = useState(false)

  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    { id: customerId },
    { enabled: true }
  )
  const [location, { refetch: refetchLocation }] = useQuery(
    getLocation,
    {
      where: { id: locationId },
    })
  const [job, { refetch: refetchJob }] = useQuery(
    getJob,
    {
      where: { id: jobId },
    })

  // const [customerOranizer, { refetch: refetchOrganizer }] = useQuery(getCustomerOrganizer, { id })
  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  return (
    <Provider
      value={{
        editJob: () => setEditingJob(true),
        showDetails: () => setShowingDetails(true),
        createJob: () => setEditingJob(true),

        job: job,

        refetchJob,
      }}
    >
      <JobModalForm
        customerId={customerId}
        isOpen={editingJob}
        onClose={() => setEditingJob(false)}
        onSuccess={() => {
          refetchJob().catch((e) => console.log(e))
          setEditingJob(false)
        }}
      />

      <JobDrawer onClose={() => setShowingDetails(false)} isOpen={showingDetails} />

      {children}
    </Provider>
  )
}

export default JobProvider
