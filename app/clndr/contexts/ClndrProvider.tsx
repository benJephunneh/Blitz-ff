import { ReactNode, useState } from "react"
import { date } from "zod"
import clndrContext from "./clndrContext"

const { Provider } = clndrContext
type ClndrProviderProps = {
  initialDate?: Date
  onChangeDate?: (d: Date) => void
  min: Date
  max: Date
  children?: ReactNode
}

const ClndrProvider = ({ initialDate, onChangeDate, min, max, children }: ClndrProviderProps) => {
  const now = new Date()
  const [shownMonthDate, setShownMonthDate] = useState(() => {
    now.setDate(1)
    return now
  })
  const [selectedDate, setSelectedDate] = useState(now)

  return (
    <Provider
      value={{
        monthDate: shownMonthDate,
        date: selectedDate,

        min,
        max,

        showMonthDate: (d: Date) => setShownMonthDate(d),
        setDate: async (d: Date) => {
          setSelectedDate(d)
          if (onChangeDate) await onChangeDate(d)
        },
      }}
    >
      {children}
    </Provider>
  )
}

export default ClndrProvider
