import { createContext } from "react"

type SchedulerContext = {
  eventToEdit: null
  setEvent: () => {}
}

const schedulerContext = createContext<SchedulerContext>({} as SchedulerContext)
export default schedulerContext
