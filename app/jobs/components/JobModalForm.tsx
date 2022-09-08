import { useMutation, useQuery } from "@blitzjs/rpc"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import createCustomer from "../mutations/createCustomer"
import updateCustomer from "../mutations/updateCustomer"
import getCustomer from "../queries/getCustomer"
import { CreateCustomer } from "../validations"
import { Center, ModalProps, Spinner } from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"

type JobModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (job: PromiseReturnType<typeof createJob | typeof updateJob>) => void
  // onSuccess?: (customer: Customer) => void
  customerId?: number
  mutationType?: MutationType
  props?: Partial<ModalProps>
}

type Job = PromiseReturnType<typeof createJob>

const JobModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  customerId,
  mutationType = "New",
  ...props
}: JobModalFormProps) => {
  const [newJobMutation] = useMutation(createJob)
  const [editJobMutation] = useMutation(updateJob)

  const [customer, { isLoading }] = useQuery(
    getJob,
    { id: jobId },
    { suspense: false, enabled: !!jobId }
  )
  // console.log(`customerId: ${customerId}`)
  // console.log(`isLoading: ${isLoading}`)
  // console.log(`customer.id: ${customer?.id}`)

  // let mutation: MutateFunction<Customer, unknown, {}, unknown>
  // let { id, firstname, lastname } = {} as Customer
  // switch (mutationType) {
  //   case "New":
  //     mutation = newCustomerMutation
  //     break
  //   case "Edit":
  //     id = customerId!
  //     firstname = customer!.firstname
  //     lastname = customer!.lastname
  //     mutation = editCustomerMutation
  //     break
  //   default:
  //     break
  // }
  // const initialValues = {
  //   id,
  //   firstname,
  //   lastname,
  // }

  const onSubmit = async (values) => {
    if (customer) {
      return editJobMutation({ id: job.id, ...values })
    }
    return newJobMutation(values)
  }

  const handleError = (error) => {
    console.log(`Error doing something with customer modal: ${error.toString()}`)
    return {
      [FORM_ERROR]: `Customer modal error: ${error.toString()}`,
    }
  }

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      schema={CreateJob}
      title={jobId ? "Edit job" : "New job"}
      submitText={jobId ? "Update" : "Create"}
      initialValues={{
        firstname: job?.firstname ?? "",
        lastname: job?.lastname ?? "",
      }}
      onSubmit={(values) => {
        onSubmit(values)
          .then((job) => onSuccess?.(job))
          .catch((error) => handleError(error))
      }}
      render={() => (
        <>
          <LabeledTextField name="firstname" label="First name" />
          <LabeledTextField name="lastname" label="Last name" />
        </>
      )}
      {...props}
    />
  )
}

export default JobModalForm
