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
import { Grid, GridItem, Modal, ModalProps } from "@chakra-ui/react"
import LabeledTextField from "app/core/components/LabeledTextField"
import { MutationType } from "app/core/components/types/MutationType"

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: PromiseReturnType<typeof createCustomer>) => void
  customerId?: number
  mutationType: MutationType
  size?: ModalProps["size"]
}

type Customer = PromiseReturnType<typeof createCustomer>

const CustomerModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  customerId,
  mutationType = "New",
  size,
}: CustomerModalFormProps) => {
  const [newCustomerMutation] = useMutation(createCustomer)
  const [editCustomerMutation] = useMutation(updateCustomer)
  const [customer] = useQuery(getCustomer, { where: { id: customerId } })

  let mutation: MutateFunction<Customer, unknown, {}, unknown>
  let { id, firstname, lastname } = {} as Customer
  switch (mutationType) {
    case "New":
      mutation = newCustomerMutation
      break
    case "Edit":
      id = customerId!
      firstname = customer!.firstname
      lastname = customer!.lastname
      mutation = editCustomerMutation
      break
    default:
      break
  }
  const initialValues = {
    id,
    firstname,
    lastname,
  }

  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      resolve(mutation(values))
    })
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
      size={size}
      schema={CreateCustomer}
      title={`${mutationType} customer`}
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
