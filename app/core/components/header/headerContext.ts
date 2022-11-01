import {
  Customer,
  CustomerStash,
  Job,
  JobStash,
  Location,
  LocationStash,
  StashType,
} from "@prisma/client"
import { createContext } from "react"

export type HeaderContext = {
  // Customer
  customer?: Customer
  createCustomer: () => void
  editCustomer: () => void
  deleteCustomer: () => void
  // gotoCustomer: (id: number) => void

  // Location
  locations?: Location[]
  locationId?: number
  locationIds?: Array<{ id: number }>
  location?: Location
  createLocation: () => void
  editLocation: () => void
  deleteLocation: () => void
  pickLocation: (id: number | undefined) => void

  // Job
  jobId?: number
  job?: Job
  createJob: () => void
  editJob: () => void
  deleteJob: () => void
  pickJob: (id: number | undefined) => void

  // Stash
  customerStashes: CustomerStash[]
  locationStashes: LocationStash[]
  jobStashes: JobStash[]
  jobStash?: JobStash
  // invoiceStashes: InvoiceStash[]
  // estimateStashes: EstimateStash[]
  numStashes: number
  editStash: (id: number | undefined, type: StashType | undefined) => void

  // Search
  // Test with only customer searches:
  openSearch: () => void
  closeSearch: () => void
  searchIsOpen: boolean
  // search: (query: string) => void
  // searchResults: Customer[] | undefined

  refetchCustomer: () => void
  refetchStashes: () => void
}

const headerContext = createContext<HeaderContext>({} as HeaderContext)
export default headerContext
