import { useMutation } from "@blitzjs/rpc";
import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import ModalForm from "app/core/components/ModalForm";
import { PromiseReturnType } from "blitz";
import React from "react";
import { FC } from "react";
import createCustomer from "../mutations/createCustomer";
import updateCustomer from "../mutations/updateCustomer";
import { CreateCustomer } from "../validations";
export { FORM_ERROR } from "app/core/components/Form";

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: PromiseReturnType<typeof createCustomer>) => void
}

const CustomerModalForm: FC<CustomerModalFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [createCustomerMutation] = useMutation(createCustomer)
  const [updateCustomerMutation] = useMutation(updateCustomer)

  const onSubmit = async values => {
    await new Promise((resolve) => {
      resolve(createCustomerMutation(values))
    })
  }

  const handleError = async error => {
    console.log(error)
  }

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size='lg'
      schema={CreateCustomer}
      title="Create new customer"
      initialValues={{ firstname: "", lastname: "" }}
      onSubmit={(values) => {
        onsubmit(values)
          .then((customer) => onSuccess?.(customer!))
          .then(() => onClose())
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

export default CustomerModalForm
