import { Routes } from "@blitzjs/next"
import { setQueryData } from "@blitzjs/rpc"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import customerContext from "app/customers/contexts/customerContext"
import useCustomer from "app/customers/hooks/useCustomer"
import JobModalForm from "app/jobs/components/JobModalForm"
import { Router, useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { number } from "zod"
import dashboardContext from "./dashboardContext"

const { Provider } = dashboardContext

type DashboardProviderProps = {
  locationId?: number
  children?: ReactNode
}

const DashboardProvider = ({ locationId, children }: DashboardProviderProps) => {
  const router = useRouter()
  const [addingCustomer, setAddingCustomer] = useState(false)
  const [deletingCustomer, setDeletingCustomer] = useState(false)
  const [addingJob, setAddingJob] = useState(false)
  const [customerId, setCustomerId] = useState<number | undefined>(undefined)
  const [query, setQuery] = useState("")

  // useEffect(() => {
  //   if (query !== "") router.push(Routes.SearchPage({ initialSearch: query }))
  //     .catch((e) => console.log(e))
  // }, [query, router])

  return (
    <Provider
      value={{
        addCustomer: () => setAddingCustomer(true),
        pickCustomer: (id) => setCustomerId(id),
        deleteCustomer: () => setDeletingCustomer(true),
        addJob: () => setAddingJob(true),
        search: (q) => setQuery(q),

        customerId,
      }}
    >
      <CustomerModalForm
        isOpen={addingCustomer}
        onClose={() => setAddingCustomer(false)}
        onSuccess={(customer) => {
          setAddingCustomer(false)
          router
            .push(Routes.ShowCustomerPage({ customerId: customer.id }))
            .catch((e) => console.log(e))
        }}
      />

      <JobModalForm
        locationId={locationId}
        isOpen={!!locationId && addingJob}
        onClose={() => setAddingJob(false)}
        onSuccess={(job) => {
          setAddingJob(false)
          router.push(Routes.ShowJobPage({ jobId: job.id })).catch((e) => console.log(e))
        }}
      />
      {children}
    </Provider>
  )
}

export default DashboardProvider
