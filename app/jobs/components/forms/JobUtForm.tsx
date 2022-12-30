import { useMutation } from "@blitzjs/rpc"
import { Job, JobStash } from "@prisma/client"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createJob from "app/jobs/mutations/createJob"
import updateJob from "app/jobs/mutations/updateJob"
import createStash from "app/stashes/mutations/createStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import updateStash from "app/stashes/mutations/updateStash"
import { ReactNode } from "react"
import { AnyZodObject } from "zod"

type JobUtFormProps = {
    job?: Job
    jobStash?: JobStash
    schema: AnyZodObject
    children: ReactNode
    onSubmit: () => void
    onSuccess?: (job: Job | JobStash | void) => void
}

const JobUtForm = ({ job, jobStash, schema, children, onSubmit, onSuccess, ...props }: JobUtFormProps) => {
    const { user: currentUser } = useCurrentUser()
    const [createJobMutation] = useMutation(createJob)
    const [updateJobMutation] = useMutation(updateJob)
    const [createStashMutation] = useMutation(createStash)
    const [updateStashMutation] = useMutation(updateStash)
    const [deleteStashMutation] = useMutation(deleteStash)
    const stashType = 'Job'

    return (

    )
}

export default JobUtForm
