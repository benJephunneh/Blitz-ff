import { useMutation, useQuery } from "@blitzjs/rpc"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import { Grid, GridItem } from "@chakra-ui/react"
import createCustomer from "app/customers/mutations/createCustomer"
import { MutationType } from "app/core/components/types/MutationType"
import updateCustomer from "app/customers/mutations/updateCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import ModalForm from "app/core/components/ModalForm"
import { CreateCustomer } from "app/customers/validations"
import LabeledTextField from "app/core/components/LabeledTextField"

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: PromiseReturnType<typeof createCustomer>) => void
  customerId?: number
}

type Customer = PromiseReturnType<typeof createCustomer>

const CustomerModalForm = (
  { isOpen, onClose, onSuccess, customerId }: CustomerModalFormProps,
  mutationType: MutationType
) => {
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
      firstname = customer.firstname
      lastname = customer.lastname
      mutation = editCustomerMutation
      break
    case "delete":
      firstname = customer.firstname
      lastname = customer.lastname
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
  const handleError = async (error) => {
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
          <Grid
            templateAreas={`'house street . .'
                                'city state zipcode'
                                'block lot parcel'`}
            templateColumns={"repeat(6, 1fr)"}
          >
            <GridItem area="house" colSpan={1}>
              <LabeledTextField name="house" label="House #" />
            </GridItem>
            <GridItem area="street" colSpan={2}>
              <LabeledTextField name="street" label="Street" />
            </GridItem>
            <GridItem area="city" colSpan={2}>
              <LabeledTextField name="city" label="City" />
            </GridItem>
            <GridItem area="state" colSpan={1}>
              <LabeledTextField name="state" label="State" disabled={true} value="FL" />
            </GridItem>
            <GridItem area="zipcode" colSpan={1}>
              <LabeledTextField name="zipcode" label="Zipcode" />
            </GridItem>
            <GridItem area="block" colSpan={1}>
              <LabeledTextField name="block" label="Block" />
            </GridItem>
            <GridItem area="lot" colSpan={1}>
              <LabeledTextField name="lot" label="Lot" />
            </GridItem>
            <GridItem area="parcel" colSpan={2}>
              <LabeledTextField name="parcel" label="Parcel" />
            </GridItem>
          </Grid>
        </>
      )}
    />
  )
}

export default CustomerModalForm
