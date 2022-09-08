import { Location } from "@prisma/client"
import { createContext } from "react"

export type LocationContext = {
  createLocation: () => void
  editLocation: () => void
  refetchLocation: () => void
  showDetails: () => void

  location: Location
  // location: {
  //   id: number
  //   house?: string | null
  //   street: string
  //   city: string
  //   state: string
  //   zipcode: string
  //   block?: string | null
  //   lot?: string | null
  //   parcel?: string | null
  //   primary?: boolean | null
  //   customerId: number
  // }

  // amountPaid: number
  // amountOwed: number
  // balance: number
}

const locationContext = createContext<LocationContext>({} as LocationContext)

export default locationContext
