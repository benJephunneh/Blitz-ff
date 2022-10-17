import { Box } from "@chakra-ui/react"
import { format } from "path"
import { ReactNode, useContext } from "react"
import clndrContext from "../contexts/clndrContext"

type CurrentMonthProps = {
  children?: ReactNode
}

const CurrentMonth = ({ children }: CurrentMonthProps) => {
  const { monthDate } = useContext(clndrContext)

  return (
    <Box data-react-any-calendar-current-month="">
      {children ? children(monthDate) : format(monthDate, "MMMM YYYY")}
    </Box>
  )
}

export default CurrentMonth
