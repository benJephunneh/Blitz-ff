import {
  Customer,
  CustomerStash,
  Job,
  JobStash,
  LineItem,
  Location,
  LocationStash,
  StashType,
} from "@prisma/client"
import { createContext } from "react"

export type HeaderContext = {
  // Customer
  customerId?: number
  customer?: Customer | null
  createCustomer: () => void
  editCustomer: () => void
  deleteCustomer: () => void
  // gotoCustomer: (id: number) => void

  // Location
  locationId?: number
  locationIds?: Array<{ id: number }>
  locations?: Location[]
  createLocation: () => void
  editLocation: () => void
  deleteLocation: () => void
  pickLocation: (id: number | undefined) => void

  // Job
  jobId?: number
  job?: Job & { lineitems: LineItem[] }
  jobs?: (Job & { lineitems: LineItem[] })[]
  createJob: () => void
  editJob: () => void
  deleteJob: () => void
  pickJob: (id: number | undefined) => void

  // Stash
  customerStashes: CustomerStash[]
  locationStashes: LocationStash[]
  jobStashes: (JobStash & { lineitems: LineItem[] })[]
  jobStash?: JobStash & { lineitems: LineItem[] }
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
  refetchLocations: () => void
  // refetchJob: () => void
  // refetchJobs: () => void
  refetchStashes: () => void
}

const headerContext = createContext<HeaderContext>({} as HeaderContext)
export default headerContext
