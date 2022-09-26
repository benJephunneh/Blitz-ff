import { useMutation, useQuery } from "@blitzjs/rpc"
import { Input, ModalProps, SimpleGrid } from "@chakra-ui/react"
import { Stash, StashType } from "@prisma/client"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import ModalForm from "app/core/components/forms/ModalForm"
import { FORM_ERROR } from "final-form"
import createStash, { CreateStash } from "../mutations/createStash"
import updateStash from "../mutations/updateStash"
import getStash from "../queries/getStash"

type StashModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  // type: StashType
  customerId?: number
  locationId?: number
  jobId?: number
  invoiceId?: number
  estimateId?: number
  stashId?: number
  props?: Partial<ModalProps>
}

const StashModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  // type,
  customerId,
  locationId,
  jobId,
  invoiceId,
  estimateId,
  stashId,
  ...props
}: StashModalProps) => {
  const [newStashMutation] = useMutation(createStash)
  const [editStashMutation] = useMutation(updateStash)

  // const stash = useQuery(
  //   getStash,
  //   {
  //     where: {
  //       id: stashId,
  //     },
  //   },
  //   {
  //     enabled: !!stashId,
  //     staleTime: Infinity,
  //   }
  // )

  const onSubmit = (values) => {
    // if (stash) {
    //   return editStashMutation(values)
    // }
    console.log("Customer is getting a stash.")
    return newStashMutation(values)
  }

  const handleError = (error) => {
    console.log(`Error doing something with stash modal: ${error.toString()}`)
    return {
      [FORM_ERROR]: `Stash modal error: ${error.toString()}`,
    }
  }

  const stashType = customerId ? "Customer" : locationId ? "Location" : jobId ? "Job" : undefined

  return (
    <ModalForm
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      schema={CreateStash}
      title={stashId ? "Edit stash" : "New stash"}
      submitText={stashId ? "Update" : "Create"}
      initialValues={{
        customerId: customerId ?? undefined,
        locationId: locationId ?? undefined,
        jobId: jobId ?? undefined,
        type: stashType,
      }}
      onSubmit={async (values) => {
        await onSubmit(values)
          .then(() => onSuccess?.()) // onSuccess( customer || stash )
          .catch((e) => handleError(e))
      }}
      render={() => (
        <SimpleGrid>
          <LabeledTextField name="id" label="Id" value={customerId} />
          <LabeledTextField name="body" label="Body" />
        </SimpleGrid>
      )}
      {...props}
    />
  )
}

export default StashModalForm
