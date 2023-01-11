import { Flex } from "@chakra-ui/react"
import { Job } from "@prisma/client"
import InputUtf from "app/core/components/forms/usetheform/components/InputUtf"
import TextareaUtf from "app/core/components/forms/usetheform/components/TextareaUTF"
import Submit from "app/core/components/forms/usetheform/components/Submit"
import { Form, useValidation } from "usetheform"
import { JobFormSchema } from "app/jobs/validations"
import { useState } from "react"

type JobWhiz1Props = {
  job?: Job
  next: () => void
}

const validateForm = (f) => {
  try {
    JobFormSchema.pick({
      title: true,
      notes: true,
    }).parse(f)
  } catch ({ errors }) {
    if (errors[0].path === "") return { all: errors[0].message }
    else {
      return errors.reduce((acc, errObj) => {
        const namefield = errObj.path[0]
        acc = {
          ...acc,
          [namefield]: errObj.message,
        }

        return acc
      }, {})
    }
  }
}

const JobWhiz1 = ({ job, next, ...props }: JobWhiz1Props) => {
  const [{ error }, validation] = useValidation([validateForm])
  const titleError = error?.["title"] || error?.["all"]

  // console.log('validation', { ...validation })
  // console.log('props', { ...props })

  return (
    <Form
      // touched
      // initialState={initialState}
      // onSubmit={v => {
      //   onSubmit(v)
      //     .then(async j => {
      //       onSuccess?.(j)
      //       await submitTasks(j)
      //     })
      //     .catch(console.error)
      // }}
      {...validation}
      {...props}
    >
      <Flex direction="column">
        <InputUtf isRequired={true} type="text" name="title" label="Job title" error={titleError} />
        <TextareaUtf isRequired={false} name="notes" label="Job notes" />
      </Flex>

      <Submit>Next</Submit>
    </Form>
  )
}

export default JobWhiz1
