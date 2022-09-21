import { useMutation, useQuery } from "@blitzjs/rpc"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import { CreateJob } from "../validations"
import { ModalProps, Text } from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"
import getJob from "../queries/getJob"
import { Job } from "db"
import getLocation from "app/locations/queries/getLocation"

type JobModalFormProps = {
  jobId?: number
  locationId?: number
  isOpen: boolean
  onClose: () => void
  onSuccess?: (job: Job) => void
  props?: Partial<ModalProps>
}

const JobModalForm = ({
  jobId,
  locationId,
  isOpen,
  onClose,
  onSuccess,
  ...props
}: JobModalFormProps) => {
  const [newJobMutation] = useMutation(createJob)
  const [editJobMutation] = useMutation(updateJob)

  const [job, { isLoading }] = useQuery(
    getJob,
    { id: jobId },
    { suspense: false, enabled: !!jobId }
  )
  const [location] = useQuery(getLocation, {
    where: {
      id: locationId,
    },
  })

  const onSubmit = (values) => {
    if (job) {
      return editJobMutation({ id: job.id, ...values })
    }
    return newJobMutation(values)
  }

  const handleError = (error) => {
    console.log(`Error doing something with job modal: ${error.toString()}`)
    return {
      [FORM_ERROR]: `Job modal error: ${error.toString()}`,
    }
  }

  return (
    <ModalForm
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      schema={CreateJob}
      title={jobId ? "Edit job" : "New job"}
      submitText={jobId ? "Update" : "Create"}
      initialValues={{
        title: job?.title ?? "",
        locationId: location.id,
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
          <Text>
            {location.house} {location.street} {location.zipcode}
          </Text>
        </>
      )}
      {...props}
    />
  )
}

export default JobModalForm
