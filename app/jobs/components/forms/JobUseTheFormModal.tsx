import { useMutation } from "@blitzjs/rpc"
import { Alert, AlertIcon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalProps, useColorModeValue } from "@chakra-ui/react"
import { Job, JobStash } from "@prisma/client"
import TextFieldUtf from "app/core/components/forms/components/TextFieldUtf"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createJob from "app/jobs/mutations/createJob"
import updateJob from "app/jobs/mutations/updateJob"
import { JobFormSchema } from "app/jobs/validations"
import createStash from "app/stashes/mutations/createStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import updateStash from "app/stashes/mutations/updateStash"
import { addDays } from "date-fns"
import { ReactNode } from "react"
import { Form, Input, useValidation } from "usetheform"
import { AnyZodObject } from "zod"

type JobUseTheFormModalProps = {
    isOpen: boolean,
    onClose: () => void
    size?: ModalProps['size']
    title: string

    job?: Job
    jobStash?: JobStash
    // schema: AnyZodObject
    children: ReactNode
    onSubmit: () => void
    onSuccess?: (job: Job | JobStash | void) => void
}

const JobUseTheFormModal = ({ isOpen, onClose, size, title, job, jobStash, children, onSubmit, onSuccess, ...props }: JobUseTheFormModalProps) => {
    const { user: currentUser } = useCurrentUser()
    const [createJobMutation] = useMutation(createJob)
    const [updateJobMutation] = useMutation(updateJob)
    const [createStashMutation] = useMutation(createStash)
    const [updateStashMutation] = useMutation(updateStash)
    const [deleteStashMutation] = useMutation(deleteStash)
    const stashType = 'Job'
    const stashFootnoteColor = useColorModeValue('red', 'cyan.200')

    const validateForm = v => {
        try {
            JobFormSchema.parse(v)
        } catch (e) {
            if (e.errors[0].path === '') return { all: e.errors[0].message }
            else return (
                e.errors.reduce((acc, errObj) => {
                    const namefield = errObj.path[0]
                    acc = { ...acc, [namefield]: errObj.message }
                })
            )
        }
    }

    const reduceTotalPrice = s => {
        const { items = [] } = s
        const tp = items.reduce((t, { quantity = 0, cost = 0 }) => {
            t += quantity * cost
            return t
        }, 0)

        return { ...s, tp }
    }

    const [{ error, isValid }, validation] = useValidation([validateForm])
    const titleError = error?.['title'] || error?.['all']
    const startError = error?.['start'] || error?.['all']
    const endError = error?.['end'] || error?.['all']
    const notesError = error?.['notes'] || error?.['all']

    const initialState = {
        title: jobStash ? jobStash.title : job ? job.title : undefined,
        start: jobStash?.start ?? job?.start ?? addDays(new Date(), 1).setHours(9),
        end: jobStash?.end ?? job?.end ?? addDays(new Date(), 1).setHours(17),
        completed: job?.completed ?? false,
        notes: jobStash?.notes ?? job?.notes ?? undefined
    }

    const bgColor = 'white'
    const headerTextColor = 'black'
    const bgGradient = 'linear(to-r, white, blackAlpha.200)'

    const handleSubmit = v => {
        console.log({ v })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior='inside'>
            <ModalOverlay bg='blackAlpha.400' backdropFilter='blur(2px) invert(10%)' />

            <ModalContent bg={bgColor}>
                <ModalHeader
                    borderBottom='1px solid whiteAlpha.100'
                    textColor={headerTextColor}
                    bgGradient={bgGradient}
                >
                    {title}
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody bg={bgColor}>
                    <Form
                        touched
                        initialState={initialState}
                        onSubmit={handleSubmit}
                        reducers={[reduceTotalPrice]}
                    >
                        {/* <Input type='text' name='title' placeholder='Title' />
                        <Input type='date' name='start' placeholder='Start' />
                        <Input type='time' name='end' placeholder='End' /> */}
                        <label htmlFor='checker'>The checkbox</label>
                        <input type='checkbox' id='checker' defaultChecked={true} />
                        {/* <TextFieldUtf isRequired name='title' prefix='Title' error={titleError} />
                <TextFieldUtf name='start' prefix='Start' error={startError} />
                <TextFieldUtf name='end' prefix='End' error={endError} /> */}
                    </Form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default JobUseTheFormModal
