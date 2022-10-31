import { Location } from "@prisma/client"
import { createContext } from "react"

export type LocationContext = {
  // pickLocation: (id: number) => void
  createLocation: () => void
  editLocation: () => void
  // deleteLocation: () => void
  showDetails: () => void

  location?: Location
  locations?: Location[]

  // amountPaid: number
  // amountOwed: number
  // balance: number

  refetchLocations: () => void
}

const locationContext = createContext<LocationContext>({} as LocationContext)

export default locationContext
