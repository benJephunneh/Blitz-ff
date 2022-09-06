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
import { Center, Grid, GridItem, Modal, ModalProps, Spinner } from "@chakra-ui/react"
import LabeledTextField from "app/core/components/LabeledTextField"
import { MutationType } from "app/core/components/types/MutationType"

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: PromiseReturnType<typeof createCustomer | typeof updateCustomer>) => void
  // onSuccess?: (customer: Customer) => void
  customerId?: number
  mutationType?: MutationType
  props?: Partial<ModalProps>
}

type Customer = PromiseReturnType<typeof createCustomer>

const CustomerModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  customerId,
  mutationType = "New",
  ...props
}: CustomerModalFormProps) => {
  const [newCustomerMutation] = useMutation(createCustomer)
  const [editCustomerMutation] = useMutation(updateCustomer)

  const [customer, { isLoading }] = useQuery(
    getCustomer,
    { where: { id: customerId } },
    { suspense: false, enabled: !!customerId }
  )

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
      return editCustomerMutation({ id: customer.id, ...values })
    }
    return newCustomerMutation(values)
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
      schema={CreateCustomer}
      title={customerId ? "Edit customer" : "New customer"}
      submitText={customerId ? "Update" : "Create"}
      initialValues={{
        firstname: customer?.firstname ?? "",
        lastname: customer?.lastname ?? "",
      }}
      onSubmit={(values) => {
        onSubmit(values)
          .then((customer) => onSuccess?.(customer))
          .catch((error) => handleError(error))
      }}
      render={() => (
        <>
          {isLoading ? (
            <Center p={3}>
              <Spinner />
            </Center>
          ) : (
            <>
              <LabeledTextField name="firstname" label="First name" />
              <LabeledTextField name="lastname" label="Last name" />
            </>
          )}
        </>
      )}
      {...props}
    />
  )
}

export default CustomerModalForm
