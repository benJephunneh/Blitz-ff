import { useMutation, useQuery } from "@blitzjs/rpc"
import { FORM_ERROR } from "final-form"
import createCustomer from "../mutations/createCustomer"
import updateCustomer from "../mutations/updateCustomer"
import getCustomer from "../queries/getCustomer"
import { CreateCustomer } from "../validations"
import { Grid, GridItem, ModalProps } from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import { Customer } from "@prisma/client"

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: Customer) => void
  // onSuccess?: (customer: Customer) => void
  customerId?: number
  mutationType?: MutationType
  props?: Partial<ModalProps>
}

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
    { id: customerId },
    { suspense: !!customerId, enabled: !!customerId }
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

  const onSubmit = (values) => {
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
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      schema={CreateCustomer}
      title={customerId ? "Edit customer" : "New customer"}
      submitText={customerId ? "Update" : "Create"}
      initialValues={{
        firstname: customer?.firstname ?? "",
        lastname: customer?.lastname ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
      }}
      onSubmit={(values) => {
        onSubmit(values)
          .then((customer) => onSuccess?.(customer))
          .catch((error) => handleError(error))
      }}
      render={() => (
        <Grid templateColumns="repeat(5, 1fr)" gap={2}>
          <GridItem colSpan={2}>
            <LabeledTextField name="firstname" label="First name" />
          </GridItem>
          <GridItem colSpan={3}>
            <LabeledTextField name="lastname" label="Last name" />
          </GridItem>
          <GridItem colSpan={3}>
            <LabeledTextField name="email" label="Email address" type="email" />
          </GridItem>
          <GridItem colSpan={2}>
            <LabeledTextField name="phone" label="Phone number" type="phone" />
          </GridItem>
        </Grid>
      )}
      {...props}
    />
  )
}

export default CustomerModalForm
