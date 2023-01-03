import { useMutation } from "@blitzjs/rpc"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react"
import { Customer, CustomerStash, Job, JobStash, Location, LocationStash } from "@prisma/client"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createCustomer from "app/customers/mutations/createCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import createJob from "app/jobs/mutations/createJob"
import updateJob from "app/jobs/mutations/updateJob"
import { JobFormSchema } from "app/jobs/validations"
import createLocation from "app/locations/mutations/createLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import createStash from "app/stashes/mutations/createStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import updateStash from "app/stashes/mutations/updateStash"
import { addDays } from "date-fns"
import { FC, ReactNode, useState } from "react"
import { Form, Input, useMultipleForm, useValidation } from "usetheform"
import { AnyZodObject } from "zod"
import CustomerUTForm from "./usetheform/CustomerUTForm"

type CLJWizardProps = {
  isOpen: boolean
  onClose: () => void
  size?: ModalProps["size"]
  title: string
  page?: number

  customer?: Customer
  location?: Location
  job?: Job

  customerStash?: CustomerStash
  locationStash?: LocationStash
  jobStash?: JobStash

  schema: AnyZodObject

  // schema: AnyZodObject
  validator: (v: any) => any
  onSubmit: (e) => void
  onSuccess?: (job: Job | JobStash | void) => void
  children?: ReactNode
}

const CLJWizard: FC<CLJWizardProps> = ({
  isOpen,
  onClose,
  size = "md",
  title,
  page = 1,

  customer,
  location,
  job,
  customerStash,
  locationStash,
  jobStash,

  validator,
  onSubmit,
  onSuccess,
  children,
  ...props
}) => {
  console.log(children)
  const { user: currentUser } = useCurrentUser()
  const [createCustomerMutation] = useMutation(createCustomer)
  const [updateCustomerMutation] = useMutation(updateCustomer)

  const [createLocationMutation] = useMutation(createLocation)
  const [updateLocationMutation] = useMutation(updateLocation)

  const [createJobMutation] = useMutation(createJob)
  const [updateJobMutation] = useMutation(updateJob)

  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)

  const stashType = "Job"
  const stashFootnoteColor = useColorModeValue("red", "cyan.200")

  const [wizardPage, setPage] = useState(1)
  const next = () => setPage((p) => ++p)
  const prev = () => setPage((p) => --p)

  const [{ error, isValid }, validation] = useValidation([validator])
  const [getWizardState, wizard] = useMultipleForm((s) => updateJson(s))
  const [wizardState, updateJson] = useState({})

  const reduceTotalPrice = (s) => {
    const { items = [] } = s
    const tp = items.reduce((t, { quantity = 0, cost = 0 }) => {
      t += quantity * cost
      return t
    }, 0)

    return { ...s, tp }
  }

  // Location errors
  const houseError = error?.["house"] || error?.["all"]
  const streetError = error?.["street"] || error?.["all"]
  const cityError = error?.["city"] || error?.["all"]
  const stateError = error?.["state"] || error?.["all"]
  const zipcodeError = error?.["zipcode"] || error?.["all"]
  const blockError = error?.["block"] || error?.["all"]
  const lotError = error?.["lot"] || error?.["all"]
  const parcelError = error?.["parcel"] || error?.["all"]

  // Job errors
  const titleError = error?.["title"] || error?.["all"]
  const startError = error?.["start"] || error?.["all"]
  const endError = error?.["end"] || error?.["all"]
  const notesError = error?.["notes"] || error?.["all"]
  const testError = error?.["notes"] || error?.["all"]

  const initialState = {
    customer,
    // location,
    // job,
    // title: jobStash ? jobStash.title : job ? job.title : undefined,
    // start: jobStash?.start ?? job?.start ?? addDays(new Date(), 1).setHours(9),
    // end: jobStash?.end ?? job?.end ?? addDays(new Date(), 1).setHours(17),
    // completed: job?.completed ?? false,
    // notes: jobStash?.notes ?? job?.notes ?? undefined
  }

  const bgColor = "white"
  const headerTextColor = "black"
  const bgGradient = "linear(to-r, white, blackAlpha.200)"

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(2px) invert(10%)" />

      <ModalContent bg={bgColor}>
        <ModalHeader
          borderBottom="1px solid whiteAlpha.100"
          textColor={headerTextColor}
          bgGradient={bgGradient}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody bg={bgColor}>
          {/* <Tabs>
            <TabList>
              <Tab>Customer</Tab>
              <Tab>Location</Tab>
              <Tab>Job</Tab>
            </TabList>

            <TabPanels>
              {page === 1 && (
                <TabPanel>
                  <Input isRequired type="text" name="firstname" prefix="First name" />
                </TabPanel>
              )}
              {page === 2 && (
                <TabPanel>
                  <p>Location</p>
                </TabPanel>
              )}
              {page === 3 && (
                <TabPanel>
                  <p>Job</p>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs> */}
          {wizardPage === 1 && (
            // <Form
            //     touched
            //     initialState={initialState.customer}
            //     onSubmit={() => onSubmit(getWizardState)}
            //     reducers={[reduceTotalPrice]}
            // >
            <CustomerUTForm />
            // {children}
            // </Form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CLJWizard
