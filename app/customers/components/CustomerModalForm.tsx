import { useMutation, useQuery } from "@blitzjs/rpc"
import { FORM_ERROR } from "final-form"
import createCustomer from "../mutations/createCustomer"
import updateCustomer from "../mutations/updateCustomer"
import getCustomer from "../queries/getCustomer"
import { CreateCustomer, UpdateCustomer } from "../validations"
import { Grid, GridItem, ModalProps } from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import { Customer, CustomerStash } from "@prisma/client"
import { useState } from "react"
import createStash from "app/stashes/mutations/createStash"
import createCustomerStash from "../mutations/createCustomerStash"
import EditorField from "app/core/components/editor/components/EditorField"

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: Customer | CustomerStash) => void
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
  const [newCustomerStashMutation] = useMutation(createCustomerStash)
  const [stashing, setStashing] = useState(false)

  const [customer, { isLoading }] = useQuery(
    getCustomer,
    {
      where: {
        id: customerId,
      },
    },
    {
      suspense: !!customerId,
      enabled: !!customerId,
      staleTime: Infinity,
    }
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
    } else if (values.stashing) {
      return newCustomerStashMutation(values)
    }
    return newCustomerMutation(values)
  }

  // const onStash = (values) => {
  //   return newCustomerStashMutation(values)
  // }

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
      schema={customerId ? UpdateCustomer : CreateCustomer}
      title={customerId ? "Edit customer" : "New customer"}
      submitText={customerId ? "Update" : "Create"}
      initialValues={{
        firstname: customer?.firstname ?? "",
        lastname: customer?.lastname ?? "",
        companyname: customer?.companyname ?? "",
        email: customer?.email ?? "",
      }}
      onSubmit={async (values) => {
        await onSubmit(values)
          .then((customer) => onSuccess?.(customer)) // onSuccess( customer || stash )
          .catch((e) => handleError(e))
      }}
      render={() => (
        <>
          <Grid templateColumns="repeat(5, 1fr)" gap={2}>
            <GridItem colSpan={2}>
              <LabeledTextField name="firstname" label="First name" />
            </GridItem>
            <GridItem colSpan={3}>
              <LabeledTextField name="lastname" label="Last name" />
            </GridItem>
            <GridItem colSpan={3}>
              <LabeledTextField name="companyname" label="Company name" />
            </GridItem>
            <GridItem colSpan={3}>
              <LabeledTextField name="email" label="Email address" type="email" />
            </GridItem>
            {/* <GridItem colSpan={2}>
            <LabeledTextField name="phone" label="Phone number" type="phone" />
          </GridItem> */}
          </Grid>
          <EditorField
            name="notes"
            fontSize="md"
            label="Stash notes"
            features={{
              heading: true,
              horizontalRule: true,
            }}
            barMenu
            bubbleMenu
            floatingMenu
          />
        </>
      )}
      {...props}
    />
  )
}

export default CustomerModalForm
