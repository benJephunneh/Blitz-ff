import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Customer } from "@prisma/client"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import ModalForm from "app/core/components/ModalForm"
import { PromiseReturnType } from "blitz"
import { useRouter } from "next/router"
import React from "react"
import { FC } from "react"
import createCustomer from "../mutations/createCustomer"
import updateCustomer from "../mutations/updateCustomer"
import { CreateCustomer } from "../validations"
export { FORM_ERROR } from "app/core/components/Form"

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: PromiseReturnType<typeof createCustomer>) => void
}

const NewCustomerModalForm: FC<CustomerModalFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const router = useRouter()
  const [createCustomerMutation] = useMutation(createCustomer)

  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      resolve(createCustomerMutation(values))
    })
  }

  const handleError = async (error) => {
    console.log(`Error creating customer: ${error}`)
  }

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={CreateCustomer}
      title="Create new customer"
      submitText="Create"
      initialValues={{ firstname: "", lastname: "" }}
      onSubmit={(values) => {
        onSubmit(values)
          .then((customer) => onSuccess?.(customer!))
          .then(() => onClose())
          .then((customer) => router.push(Routes.ShowCustomerPage({ customerId: customer.id })))
          .catch((error) => handleError(error))
      }}
      render={() => (
        <>
          <LabeledTextField name="firstname" label="First name" placeholder="First name" />
          <LabeledTextField name="lastname" label="Last name" placeholder="Last name" />
        </>
      )}
    />
  )
}

export default NewCustomerModalForm
