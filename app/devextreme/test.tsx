import { Text } from "@chakra-ui/react"
import Scheduler from "devextreme-react/scheduler"
import { useState } from "react"

const currentDate = new Date()
// const views: Array<'day' | 'week' | 'workWeek' | 'month' | 'timelineDay' | 'timelineWeek' | 'timelineWorkWeek' | 'timelineMonth' | 'agenda' | {
// const views: Array<'day' | 'week' | 'timelineDay'> =
const views = ["day", "week", "timelineDay"]
let date: number | null = null

const SchedulerTest = () => {
  const { eventToEdit, setEvent } = useSchedulerContext()
  const [scheduler, setScheduler] = useState(null)
  setGlobal("globalSetEvent", setEvent)

  return (
    <>
      <Text>Test</Text>
      <Scheduler
        dataSource={[]}
        views={views}
        defaultCurrentView="day"
        defaultCurrentDate={currentDate}
        height={600}
        textExpr="name"
        startDateExpr="startDate"
        endDateExpr="endDate"
        firstDayOfWeek={0}
        startDayHour={9}
        endDayHour={17}
        showAllDayPanel={false}
        crossScrollingEnabled={true}
        cellDuration={20}
        onContentReady={(e) => {
          if (!scheduler) setScheduler(e.component)
        }}
        onAppointmentFormOpening={(e) => {
          date = new Date().getTime()
          onAppointmentFormOpening(e)
          console.log("1", newDate().getTime() - date)
        }}
      />
    </>
  )
}

export default SchedulerTest
