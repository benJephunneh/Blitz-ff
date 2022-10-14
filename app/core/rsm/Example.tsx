import { ScheduleMeeting } from "react-schedule-meeting"

const Example = () => {
  const availableTimeslots = [0, 1, 2, 3, 4, 5, 6].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)
      ),
    }
  })

  return (
    <ScheduleMeeting
      format_selectedDateDayTitleFormatString="cccc, dd LLLL"
      startTimeListStyle="scroll-list"
      borderRadius={8}
      primaryColor="#3f5b85"
      eventDurationInMinutes={30}
      availableTimeslots={availableTimeslots}
      onStartTimeSelect={console.log}
    />
  )
}

export default Example
