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

type Subheader = "Customer" | "Location" | "Job" | "Invoice" | "Estimate"

export type HeaderContext = {
  subheader?: Subheader
  pickSubheader: (sh: Subheader) => void
  // Customer
  customer?: Customer | null
  customerId?: number
  createCustomer: () => void
  editCustomer: () => void
  deleteCustomer: () => void
  // gotoCustomer: (id: number) => void

  // Location
  locationId?: number
  // locationIds?: Array<{ id: number }>
  // location?: Location
  // createLocation: () => void
  // editLocation: () => void
  deleteLocation: () => void
  // pickLocation: (update: (locationId: number) => number) => void
  pickLocation: (id: number) => void

  // Job
  // jobId?: number
  // job?: Job
  // createJob: () => void
  // editJob: () => void
  // deleteJob: () => void
  // pickJob: (id: number | undefined) => void

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
