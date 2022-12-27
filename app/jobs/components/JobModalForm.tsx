import { useMutation, useQuery } from "@blitzjs/rpc"
import { FORM_ERROR } from "final-form"
import { JobFormSchema } from "../validations"
import { Box, Flex, Grid, GridItem, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"
import { Job, LineItem, User } from "db"
import { useContext, useState } from "react"
import deleteStash from "app/stashes/mutations/deleteStash"
import createStash from "app/stashes/mutations/createStash"
import updateStash from "app/stashes/mutations/updateStash"
import { LabeledDateField } from "app/calendar/components/LabeledDateField"
import getStash from "app/stashes/queries/getStash"
import TextAreaField from "app/core/components/forms/components/TextAreaField"
import { addBusinessDays, getWeek } from "date-fns"
import WeekView from "app/calendar/components/WeekView"
import headerContext from "app/core/components/header/headerContext"
import LineItemSearchField from "app/lineitems/components/LineItemSearchField"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import dragAndDropListItemContext, {
  DragAndDropJob,
} from "app/lineitems/contexts/dragAndDropListItemContext"
import LineItemCard from "app/lineitems/components/LineItemCard"
import findLineItem from "app/lineitems/queries/findLineItem"
import LineItemMiniCard from "app/lineitems/components/LineItemMiniCard"

// const handleDayClick = async (d: Date) => {
//   const dayBefore = subDays(d, 1)
//   const dayAfter = addDays(d, 1)

//   const jobs = await db.job.findMany({
//     where: {
//       AND: [{ start: { gte: dayBefore } }, { end: { lte: dayAfter } }],
//     },
//   })

//   return jobs
// }

type JobModalFormProps = {
  customerId?: number
  locationId?: number
  jobId?: number
  // job?: Job
  stashId?: number
  // jobStash?: JobStash
  disableStash?: boolean
  // locationId?: number
  isOpen: boolean
  onClose: () => void
  onSuccess?: (job: Job) => void
  // handleDrop?: (drop: DropResult) => void
  // props?: Partial<ModalProps>
}

// const { Provider: DragAndDropProvider } = dragAndDropListItemContext

const JobModalForm = ({
  customerId,
  locationId,
  jobId,
  stashId,
  // job,
  // jobStash,
  disableStash,
  // locationId,
  isOpen,
  onClose,
  onSuccess,
  // handleDrop,
  ...props
}: JobModalFormProps) => {
  const { job, jobs, jobStash, lineitems, setLineitems } = useContext(headerContext)
  // console.table(lineitems)
  // const [dragAndDropState, setDragAndDropState] = useState<DragAndDropJob>({ id: jobId, title, lineitems } as Job)

  const [createJobMutation] = useMutation(createJob)
  const [updateJobMutation] = useMutation(updateJob)
  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)
  const [user, setUser] = useState<User>()
  const [calendarValue, onCalendarChange] = useState(new Date())
  const [calendarView, setCalendarView] = useState(<WeekView />)

  const stashType = "Job"
  const stashFootnoteColor = useColorModeValue("red", "cyan.200")

  // const job = jobs?.find(({ id }) => id === jobId)
  // console.table({ ...job })
  // const [job, { refetch: refetchJob }] = useQuery(
  //   getJob,
  //   {
  //     where: { id: jobId },
  //   },
  //   {
  //     enabled: !!jobId,
  //     staleTime: Infinity,
  //     refetchOnWindowFocus: false,
  //   }
  // )

  // const [jobStash] = useQuery(
  //   getStash,
  //   {
  //     id: stashId,
  //     stashType,
  //   },
  //   {
  //     enabled: !!stashId,
  //     staleTime: Infinity,
  //     refetchOnWindowFocus: false,
  //   }
  // )

  const today = new Date()
  // let m: Date
  // if (isMonday(today)) m = today
  // else m = previousMonday(today)
  // const [monday, setMonday] = useState<Date | null>(m)
  // const [friday, setFriday] = useState<Date | null>(addDays(m, 4))
  const [weekNumber, setWeekNumber] = useState(getWeek(today))

  const handleWeekNumberClick = async (w: number) => {
    console.log({ w })
    // setWeekNumber(w)
    setCalendarView(<WeekView weekNumber={w} />)
  }
  // const handleDayClick = async (d: Date) => {
  //   console.log({ d })
  //   setCalendarView(<DayView date={d} />)
  // }

  const onSubmit = async (values) => {
    console.table({ values })
    // console.log({ locationId })
    const { stashing, range, ...formSubmission } = values
    const [start, end] = range.map((t) => t)
    // console.log({ start })

    let jobRet
    if (stashing) {
      console.log("Stashing...")
      if (jobStash) {
        jobRet = await updateStashMutation({
          id: jobStash.id,
          stashType,
          job: {
            start,
            end,
            ...formSubmission,
          },
        })
      } else {
        jobRet = await createStashMutation({
          stashType,
          job: {
            customerId,
            locationId,
            start,
            end,
            ...formSubmission,
          },
        })
      }
    } else {
      console.log("Jobbing...")
      if (job) {
        jobRet = updateJobMutation({
          id: job.id,
          start,
          end,
          ...formSubmission,
        })
      } else {
        console.log("creating job...")
        console.log({ locationId })
        jobRet = createJobMutation({
          customerId,
          locationId,
          start,
          end,
          ...formSubmission,
        })
        if (jobStash && jobRet) {
          await deleteStashMutation({
            id: jobStash.id,
            stashType,
          })
        }
      }
    }

    setLineitemSearchData([])
      .then(() => setQuery(""))
      .catch(console.error)
    return jobRet
  }

  const handleError = (error) => {
    console.log(`Error doing something with job modal: ${error.toString()}`)
    return {
      [FORM_ERROR]: `Job modal error: ${error.toString()}`,
    }
  }

  const jobListId = "job-lineitems"
  const searchListId = "search-lineitems"
  const [lineitemId, setLineitemId] = useState<number>()
  // const [lineitems, setLineitems] = useState<LineItem[]>(job?.lineitems || {} as LineItem[])
  const [query, setQuery] = useState("")
  const [lineitemSearchResults, { setQueryData: setLineitemSearchData, isLoading }] = useQuery(
    findLineItem,
    { query },
    { enabled: !!query, refetchOnWindowFocus: false }
  )
  const searchProvider = {
    query,
    setQuery,
    lineitems,
    lineitemSearchResults,
    isLoading,
    setLineitems,
  }

  // console.table(lineitems)

  // const [startDateTime, setStartDateTime] = useState(addDays(new Date().setHours(9, 0, 0, 0), 1))
  // const [endDateTime, setEndDateTime] = useState(addDays(new Date().setHours(17, 0, 0, 0), 1))
  const start = jobStash?.start || job?.start // || addBusinessDays(new Date(), 1).setHours(9, 0, 0, 0)
  const end = jobStash?.end || job?.end // || addBusinessDays(new Date(), 1).setHours(17, 0, 0, 0)

  const initialValues = {
    title: jobStash?.title || job?.title || undefined,
    range: [start, end],
    notes: jobStash ? JSON.parse(jobStash.notes) : job?.notes ? JSON.parse(job.notes) : null,
    lineitems: jobStash?.lineitems || job?.lineitems || [],
  }

  const onDelete = (lineitemId: number) => {
    const idx = lineitems!.findIndex(({ id }) => id === lineitemId)
    lineitems!.splice(idx, 1)
    setLineitems([...lineitems!])
  }

  const onDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return
    // console.log(source, destination, draggableId)
    // console.table(lineitems)

    const start = source.droppableId
    const end = destination.droppableId
    const sortOrder = lineitems!.map(({ id }) => id)
    // console.log({ sortOrder })

    if (start === end) {
      if (source.index === destination.index) return
      if (start !== jobListId) return

      const spliced = sortOrder.splice(source.index, 1)
      sortOrder.splice(destination.index, 0, spliced.at(0)!)
      // dummyArray.sort((a, b) => {
      //   return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id)
      // })
      setLineitems(
        lineitems!.sort((a, b) => {
          return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id)
        })
      )
    } else {
      // if (lineitems.findIndex(({ id }) => id == draggableId) !== -1) return
      if (lineitems!.includes(draggableId)) return
      const moving = lineitemSearchResults!.find(({ id }) => id == draggableId)!
      const tempLineitems = lineitems
      tempLineitems!.splice(destination.index, 0, moving!)
      setLineitems(tempLineitems)
    }

    // const newLineitems = Array.from(lineitems)
    // newLineitems.splice(destination.index, 0, source.index)

    // setLineitems(newLineitems)
    // console.log({ ...newLineitems })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <DragAndDropProvider value={props}> */}
      <ModalForm
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        disableStash={disableStash}
        schema={JobFormSchema}
        title={job ? "Edit job" : "New job"}
        submitText={job ? "Update" : "Create"}
        initialValues={initialValues}
        onSubmit={(values) => {
          // console.log({ ...lineitems })
          values.lineitems = lineitems
          // console.log({ ...values })
          onSubmit(values).then(onSuccess).catch(handleError)
        }}
        render={() => (
          <>
            <Grid
              templateAreas={`
                'title items sched'
                '. items sched'
                'cal search sched'
                'cal search sched'
                'notes search sched'
              `}
              gridTemplateColumns="25% 30% 40%"
              gridTemplateRows="60px repeat(4, 1fr)"
              // w="full"
              // h='100%'
              gap={3}
            >
              <GridItem area="title">
                <LabeledTextField name="title" label="Title" />
              </GridItem>

              <GridItem area="items" maxH="200px">
                <Droppable droppableId={jobListId}>
                  {(provided, snapshot) => (
                    <Flex
                      border="3px solid"
                      borderRadius="md"
                      bg={snapshot.isDraggingOver ? "lemonchiffon" : "white"}
                      borderColor="gray.100"
                      display="flex"
                      flexDirection="column"
                      transition="1s ease"
                      minH="200px"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Heading size="xs" textAlign="center" bg="gray.200">
                        Line items
                      </Heading>

                      {/* {lineitems.map((li, ii) => (
                        <LineItemCard
                          key={li.id}
                          lineitem={li}
                          draggableIndex={ii}
                          mb='8px'
                        />
                      ))} */}
                      {/* {dummyArray.map((li, ii) => ( */}
                      {lineitems.map((li, ii) => (
                        <Draggable key={li.id} draggableId={li.id.toString()} index={ii}>
                          {(provided, isDragging: boolean) => (
                            <Box
                              border="1px solid"
                              borderColor="transparent"
                              borderRadius="sm"
                              bgColor={isDragging ? "whiteAlpha.600" : "white"}
                              p={0}
                              m="4px"
                              // mb="8px"
                              transition="100ms ease-in-out"
                              backdropFilter="auto"
                              backdropBlur={isDragging ? "2px" : "0px"}
                              _hover={{ borderColor: "blue.400" }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <LineItemMiniCard
                                key={li.id}
                                lineitem={li}
                                onDelete={onDelete}
                                itemizing={true}
                                // draggableIndex={ii}
                              />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Flex>
                  )}
                </Droppable>
              </GridItem>

              <GridItem area="cal">
                <LabeledDateField
                  name="range"
                  label="Date range"
                  start={start}
                  end={end}
                  // onClickDay={handleDayClick}
                  onClickWeekNumber={handleWeekNumberClick}
                  // console.log({ w })
                  // handleWeekNumberClick(w).catch((e) => console.error(e))
                  // }}
                />
              </GridItem>

              <GridItem area="notes">
                <TextAreaField
                  name="notes"
                  label="Notes"
                  placeholder="Add notes about this job..."
                />
              </GridItem>

              <GridItem area="search">
                <LineItemSearchField
                  name="lineitems"
                  label="Search to add jobs"
                  // lineitems={{ lineitems, setLineitems }}
                  searchProvider={searchProvider}
                />
              </GridItem>

              <GridItem area="sched" h="100%">
                {/* <DayView date={new Date()} /> */}
                {calendarView}
              </GridItem>
            </Grid>
            {/* <LabeledTextField name="start" label="Start date/time" /> */}
            {/* <LabeledTextField name="end" label="End date/time" /> */}
            {/* <LabeledDateField name="end" label="End" initialDate={endDateTime} /> */}
            {/* <LabeledDateRangeField name='dateRange' label='Date range' /> */}
            {/* <EditorField
            name="notes"
            fontSize="md"
            label="Stash notes"
            features={{
              heading: true,
              horizontalRule: true,
            }}
          /> */}
            {jobStash && (
              <Text fontSize="xs" color={stashFootnoteColor}>
                Stashed by {user?.username}
              </Text>
            )}
          </>
        )}
      />
      {/* </DragAndDropProvider> */}
    </DragDropContext>
  )
}

export default JobModalForm
