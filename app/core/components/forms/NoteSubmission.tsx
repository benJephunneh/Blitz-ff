import { x } from "@blitzjs/auth/dist/index-57d74361"
import { useMutation } from "@blitzjs/rpc"
import { Box, BoxProps, LayoutProps } from "@chakra-ui/react"
import { Customer, Estimate, Invoice, Job, Location } from "@prisma/client"
import updateCustomer from "app/customers/mutations/updateCustomer"
import updateJob from "app/jobs/mutations/updateJob"
import { notes } from "app/lineitems/validations"
import updateLocation from "app/locations/mutations/updateLocation"
import { PromiseReturnType } from "blitz"
import { ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { Form as FinalForm } from "react-final-form"
import { z } from "zod"
import EditorField from "../editor/components/EditorField"
import TextAreaField from "./components/TextAreaField"

type NoteSubmissionProps = {
  isEditing: boolean
  modelType: "Customer" | "Location" | "Job" | "Estimate" | "Invoice" | "LineItem"
  // modelId?: number
  customer?: Customer
  location?: Location
  job?: Job
  invoice?: Invoice
  estimate?: Estimate
  onSuccess?: (
    model: PromiseReturnType<
      typeof updateCustomer | typeof updateLocation | typeof updateJob
      // | typeof updateInvoice
      // | typeof updateEstimate
    >
  ) => void
}
const NoteSchema = z.object({
  notes: z.string(),
})

const NoteSubmission = ({
  isEditing,
  modelType,
  // modelId,
  customer,
  location,
  job,
  invoice,
  estimate,
  onSuccess,
}: NoteSubmissionProps) => {
  const [updateCustomerMutation] = useMutation(updateCustomer)
  const [updateLocationMutation] = useMutation(updateLocation)
  const [updateJobMutation] = useMutation(updateJob)
  // const [updateInvoiceMutation] = useMutation(updateInvoice)
  // const [updateEstimateMutation] = useMutation(updateEstimate)

  const onSubmit = async (notes) => {
    console.log(JSON.stringify(notes))

    switch (modelType) {
      case "Customer":
        await updateCustomerMutation({ notes, ...customer })
        break
      case "Location":
        break
      case "Job":
        break
      case "Invoice":
        break
      case "Estimate":
        break

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
    <FinalForm
      onSubmit={onSubmit}
      schema={NoteSchema}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <TextAreaField
            isEditing={isEditing}
            name="notes"
            label={`${modelType} notes`}
            placeholder={`Additional notes about this ${modelType.toLowerCase()}`}
            // modelType={modelType}
            // modelId={modelId}
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
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    />
  )
}

export default NoteSubmission
