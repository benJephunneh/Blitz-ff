import { useMutation } from "@blitzjs/rpc"
import { Button, HStack, Text, useColorModeValue } from "@chakra-ui/react"
import { Customer, Estimate, Invoice, Job, Location } from "@prisma/client"
import updateCustomer from "app/customers/mutations/updateCustomer"
import updateJob from "app/jobs/mutations/updateJob"
import updateLocation from "app/locations/mutations/updateLocation"
import { useState } from "react"
import { Form as FinalForm } from "react-final-form"
import { z } from "zod"
import TextAreaField from "./components/TextAreaField"

type NoteSubmissionProps = {
  modelType: "Customer" | "Location" | "Job" | "Estimate" | "Invoice" | "LineItem"
  label?: string
  // modelId?: number
  customer?: Customer | null
  location?: Location
  job?: Job
  invoice?: Invoice
  estimate?: Estimate
  // onSuccess?: (
  //   model: PromiseReturnType<
  //     typeof updateCustomer | typeof updateLocation | typeof updateJob
  //   // | typeof updateInvoice
  //   // | typeof updateEstimate
  //   >
  // ) => void
  onSuccess?: () => void
}
const NoteSchema = z.object({
  notes: z.string(),
})

const NoteSubmission = ({
  modelType,
  label,
  // modelId,
  customer,
  location,
  job,
  invoice,
  estimate,
  onSuccess,
}: NoteSubmissionProps) => {
  const [deletingNote, setDeletingNote] = useState(false)
  const [updateCustomerMutation] = useMutation(updateCustomer)
  const [updateLocationMutation] = useMutation(updateLocation)
  const [updateJobMutation] = useMutation(updateJob)
  // const [updateInvoiceMutation] = useMutation(updateInvoice)
  // const [updateEstimateMutation] = useMutation(updateEstimate)

  const textFieldBg = useColorModeValue("white", "gray.200")
  const textFieldBorderColor = useColorModeValue("blackAlpha.50", "blackAlpha.100")

  const onSubmit = async (notes) => {
    // console.log(notes.notes)
    if (notes.reset) notes.notes = null

    switch (modelType) {
      case "Customer":
        if (customer) {
          customer.notes = notes.notes
          await updateCustomerMutation({ ...customer })
        }
        break
      case "Location":
        if (location) {
          location.notes = notes.notes
          await updateLocationMutation({ ...location })
        }
        break
      case "Job":
        if (job) {
          job.notes = notes.notes
          await updateJobMutation({ ...job })
        }
        break
      // case "Invoice":
      //   if (invoice) {
      //     invoice.notes = notes.notes
      //     return await updateInvoiceMutation({ ...invoice })
      //   }
      //   break
      // case "Estimate":
      //   if (estimate) {
      //     estimate.notes = notes.notes
      //     return await updateEstimateMutation({ ...estimate })
      //   }
      //   break

      default:
        break
    }
  }

  const initialValues = {
    notes: customer
      ? customer.notes
      : location
        ? location.notes
        : job
          ? job.notes
          : invoice
            ? invoice.notes
            : // estimate ?
            // estimate.notes :
            undefined,
  }

  const buttonBg = useColorModeValue("blackAlpha.200", "blackAlpha.400")

  // switch (modelType) {
  //   case 'Customer':
  //     oldNotes = customer?.notes
  //     break;
  //   case 'Location':
  //     oldNotes = location?.notes
  //     break;
  //   case 'Job':
  //     oldNotes = job?.notes
  //     break;
  //   // case 'Invoice':
  //   //   oldNotes = invoice?.notes
  //   //   break;
  //   // case 'Estimate':
  //   //   oldNotes = estimate?.notes
  //   //   break;

  //   default:
  //     break;
  // }

  return (
    <>
      {/* <ConfirmDeleteModal
        title={'Delete notes?'}
        isOpen={deletingNote}
        onClose={() => {
          setDeletingNote(false)
        }}
        onConfirm={() => onSubmit()}
      /> */}

      <FinalForm
        onSubmit={onSubmit}
        schema={NoteSchema}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, pristine, values, form }) => (
          <form onSubmit={handleSubmit}>
            <TextAreaField
              name="notes"
              label={label}
              placeholder={`Add notes about this ${modelType.toLowerCase()}...`}
              bg={textFieldBg}
              borderWidth={1}
              borderColor={textFieldBorderColor}
            />
            {/* <Box borderRadius={4} {...boxProps}>
            <EditorField
              name='notes'
              fontSize='md'
              label={`${modelType} note`}
              features={{
                heading: true,
                horizontalRule: true,
              }}
            />

          </Box> */}

            <HStack justify="space-between">
              <Button
                bg={buttonBg}
                border={1}
                borderColor="whiteAlpha.50"
                size="sm"
                disabled={
                  pristine ||
                  submitting ||
                  (values.notes === undefined && initialValues.notes === null) ||
                  values.notes === initialValues.notes
                }
                type="submit"
                variant="ghost"
                borderTopRadius={0}
              // isDisabled={pristine || submitting}
              >
                Update notes
              </Button>
              <Text fontSize="xs" fontWeight="semibold">
                {`${modelType} notes`}
              </Text>
              {/* <Button
                bg={buttonBg}
                border={1}
                borderColor='whiteAlpha.50'
                colorScheme='green'
                size='sm'
                alignSelf='start'
                disabled={
                  pristine
                  || submitting
                  || (values.notes === undefined && initialValues.notes === null)
                  || values.notes === initialValues.notes
                }
                type='submit'
                variant='ghost'
                onClick={() => form.change('stashing', true)}
              >
                Stash
              </Button> */}
              <Button
                bg={buttonBg}
                border={1}
                borderColor="whiteAlpha.50"
                size="xs"
                alignSelf="start"
                disabled={!initialValues.notes}
                variant="ghost"
                textColor="red"
                onClick={() => {
                  form.change("reset", true)
                  setDeletingNote(true)
                }}
                type="submit"
                borderTopRadius={0}
              >
                Reset notes
              </Button>
            </HStack>

            {/* <pre>{JSON.stringify(values.notes, null, 2)}</pre> */}
          </form>
        )}
      />
    </>
  )
}

export default NoteSubmission
