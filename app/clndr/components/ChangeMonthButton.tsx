import { Button } from "@chakra-ui/react"
import { ReactNode, useContext } from "react"
import clndrContext from "../contexts/clndrContext"

type ChangeMonthButtonProps = {
  interval?: number
  onClick?: (d: Date) => void
  children?: ReactNode
}

const ChangeMonthButton = ({ interval = 1, onClick, children }: ChangeMonthButtonProps) => {
  const { showMonthDate } = useContext(clndrContext)

  return (
    <Button
      data-react-any-calendar-month-button=""
      onClick={() => {
        ;((d) => {
          const nd = new Date(d.setMonth(d.getMonth() + interval))
          if (onClick) onClick(nd)
          showMonthDate(nd)
        })({} as Date)
      }}
    >
      {children}
    </Button>
  )
}

export default ChangeMonthButton
