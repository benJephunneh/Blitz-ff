import { useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

const Calendar = () => {
  const calendarRef = useRef(null)
  const renderEventContent = (e) => {
    return (
      <>
        <b>{e.timeText}</b>
        <i>{e.event.title}</i>
      </>
    )
  }

  return (
    <FullCalendar
      // innerRef={calendarRef}
      eventContent={renderEventContent}
      plugins={[timeGridPlugin, interactionPlugin]}
      editable
      selectable
    />
  )
}

export default Calendar
