import { useMutation } from "@blitzjs/rpc"
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useColorModeValue,
} from "@chakra-ui/react"
import { Job, LineItem } from "@prisma/client"
import WeekView from "app/calendar/components/WeekView"
import headerContext from "app/core/components/header/headerContext"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createStash from "app/stashes/mutations/createStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import updateStash from "app/stashes/mutations/updateStash"
import { useContext, useState } from "react"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"
import { Form, useMultipleForm } from "usetheform"
import JobWhiz1 from "./usetheform/JobWhiz1"
import JobWhiz2 from "./usetheform/JobWhiz2"
import JobWhiz3 from "./usetheform/JobWhiz3"

type JobWizardFormProps = {
  formTitle: string
  size?: ModalProps["size"]

  customerId?: number
  locationId?: number
  jobId?: number
  stashId?: number

  jobject?: {}
  onChange: (n: any) => void

  disableStash?: boolean
  isOpen: boolean
  onClose: () => void
  onSuccess?: (job: Job) => void
}

type Values = {
  jobId: number
  title: string
  start?: Date
  end?: Date
  notes?: string
  lineitems?: LineItem[]
}

const JobWizardForm = ({
  formTitle,
  size = "md",
  customerId,
  locationId,
  jobId,
  stashId,
  jobject = {},
  onChange,
  disableStash,
  isOpen,
  onClose,
  onSuccess,
}: JobWizardFormProps) => {
  const { jobs } = useContext(headerContext)
  const [job, setJob] = useState<Job>()
  const user = useCurrentUser()

  const [createJobMutation] = useMutation(createJob)
  const [updateJobMutation] = useMutation(updateJob)
  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)

  const [calendarValue, onCalendarChange] = useState(new Date())
  const [calendarView, setCalendarView] = useState(<WeekView />)

  const [page, setPage] = useState(1)
  const next = () => setPage((p) => ++p)
  const prev = () => setPage((p) => --p)

  // const initialState = {
  //   title: job?.title ?? "",
  //   start: job?.start ?? null,
  //   end: job?.start ?? null,
  //   completed: job?.completed ?? false,
  //   locateRequired: job?.locateRequired ?? false,
  //   notes: job?.notes ?? null,
  // }
  // const [wizardState, updateJSON] = useState(jobject)
  const [getWizardState, wizard] = useMultipleForm((s) => {
    onChange({
      ...jobject,
      ...s,
    })
  })
  const onSubmitWizard = () => console.log(getWizardState())
  // console.log('getWS', getWizardState()) // Changes at submits.

  const headerGradient = useColorModeValue(
    "linear(to-r, white, blackAlpha.200)",
    "linear(to-r, blackAlpha.500, gray.700)"
  )

  // const { lineitems, ...j } = jobs?.find(({ id }) => id === jobId)
  // const lineitems = job?.lineitems
  // let title = ''
  // let start: Date | null
  // let end: Date | null
  // let notes: string
  // let lineitems: LineItem[]

  const onSubmit = async (v) => {
    console.log(v)

    return v as Job
  }
  const stashType = "Job"

  // console.log('wizardState', { ...wizardState })

  return (
    // <Tabs variant='unstyled'>
    //   <TabList>
    //     <Tab>One</Tab>
    //     <Tab>Two</Tab>
    //   </TabList>

    //   <TabPanels>
    //     <TabPanel>
    //       <JobWhiz1 name='job1' {...wizard} onSubmit={next} />
    //     </TabPanel>
    //     <TabPanel>
    //       Two
    //     </TabPanel>
    //   </TabPanels>
    // </Tabs>
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setPage(1)
        onClose()
      }}
      size={size}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(2px) invert(10%)" />

      <ModalContent pb={1}>
        <ModalHeader borderBottom="1px wolid" bgGradient={headerGradient}>
          {formTitle}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex minW="full">
            {
              page === 1 ? (
                <JobWhiz1 name="job1" {...wizard} onSubmit={next} />
              ) : page === 2 ? (
                <JobWhiz2 name="job2" {...wizard} prev={prev} onSubmit={next} />
              ) : (
                <JobWhiz3 name="job3" {...wizard} prev={prev} onSubmit={onSubmitWizard} />
              )
              // : <></>
            }
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default JobWizardForm
