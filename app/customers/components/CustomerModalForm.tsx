import { MutateFunction, useMutation, useQuery } from "@blitzjs/rpc"
import ModalForm from "app/core/components/ModalForm"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import { type } from "os"
import createCustomer from "../mutations/createCustomer"
import deleteCustomer from "../mutations/deleteCustomer"
import updateCustomer from "../mutations/updateCustomer"
import getCustomer from "../queries/getCustomer"
import { CreateCustomer, firstname } from "../validations"
import { Grid, GridItem } from "@chakra-ui/react"
import LabeledTextField from "app/core/components/LabeledTextField"
import { MutationType } from "app/core/components/types/MutationType"

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: PromiseReturnType<typeof createCustomer>) => void
  customerId?: number
  mutationType: MutationType
}

type Customer = PromiseReturnType<typeof createCustomer>

const CustomerModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  customerId,
  mutationType,
}: CustomerModalFormProps) => {
  const [newCustomerMutation] = useMutation(createCustomer)
  const [editCustomerMutation] = useMutation(updateCustomer)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const [customer] = useQuery(getCustomer, { where: { id: customerId } })

  let mutation
  let { firstname, lastname } = {} as Customer
  switch (mutationType) {
    case "new":
      mutation = newCustomerMutation
      break
    case "edit":
      firstname = customer!.firstname
      lastname = customer!.lastname
      mutation = editCustomerMutation
      break
    case "delete":
      firstname = customer!.firstname
      lastname = customer!.lastname
      mutation = deleteCustomerMutation
      break
    default:
      break
  }
  const initialValues = {
    firstname,
    lastname,
  }

  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      resolve(mutation(values))
    })
  }
  const handleError = (error) => {
    return {
      [FORM_ERROR]: `Customer modal error: ${error.toString()}`,
    }
  }

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={CreateCustomer}
      title="Customer form"
      submitText="Submit"
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values)
          .then((_customer) => onSuccess?.(_customer!))
          .then(() => onClose())
          .catch((error) => handleError(error))
      }}
      render={() => (
        <>
          <LabeledTextField name="firstname" label="First name" />
          <LabeledTextField name="lastname" label="Last name" />
        </>
      )}
    />
  )
}

export default CustomerModalForm
