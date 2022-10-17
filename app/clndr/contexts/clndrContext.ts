import { createContext } from "react"

export type ClndrContext = {
  monthDate: Date
  date?: Date

  min: Date | number
  max: Date | number

  showMonthDate: (d: Date) => void
  setDate: (d: Date) => void
}

const clndrContext = createContext<ClndrContext>({} as ClndrContext)
export default clndrContext
