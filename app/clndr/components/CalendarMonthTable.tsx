import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react"
import { ReactNode, useContext } from "react"
import clndrContext from "../contexts/clndrContext"
import { getDatesByWeekNo } from "../functions/funcs"

type CalendarMonthTableProps = {
  weekLabels?: Array<string>
  children: (a: any) => ReactNode
}
const CalendarMonthTable = ({
  weekLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  children,
}: CalendarMonthTableProps) => {
  const { monthDate } = useContext(clndrContext)
  const datesInMonthByWeek = getDatesByWeekNo(monthDate)
  return (
    <Table data-react-any-calendar-table="">
      <Thead>
        <Tr>
          {weekLabels.map((day, ii) => (
            <Td key={ii} data-react-any-calendar-heading-cells="">
              {day}
            </Td>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {datesInMonthByWeek.map((weekdays, ii) => {
          return (
            <Tr key={monthDate + ii} data-react-any-calendar-row="">
              {children(weekdays)}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default CalendarMonthTable
