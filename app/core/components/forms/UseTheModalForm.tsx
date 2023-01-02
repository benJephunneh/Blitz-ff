import { Modal, ModalOverlay, ModalProps, useColorModeValue } from "@chakra-ui/react"
import { JobFormSchema } from "app/jobs/validations"
import { ReactNode } from "react"
import { Form, useValidation } from "usetheform"
import { AnyZodObject, z } from "zod"
import { FormComponent } from "./FormComponent"

type UseTheModalFormProps = {
    isOpen: boolean
    onClose: () => void
    size?: ModalProps['size']
    title: string
    submitText?: string
    disableStash?: boolean

    schema: AnyZodObject
    // initialValues: z.infer<typeof JobFormSchema>
    // onSubmit,
    validator: (v: any) => any
    children?: ReactNode
}

const UseTheModalForm: FormComponent<UseTheModalFormProps> = ({
    isOpen,
    onClose,
    size,
    title,
    submitText,
    disableStash,

    schema,
    // initialValues,
    // onSubmit,
    render,
    validator,
    children
}) => {
    const schemaKeys = Object.keys(schema)
    const validateForm = v => {
        try {
            schema?.parse(v)
        } catch (e) {
            if (e.errors[0].path === '') return { all: e.errors[0].message }
            else return (
                e.errors.reduce((acc, errObj) => {
                    const namefield = errObj.path[0]
                    acc = { ...acc, [namefield]: errObj.message }
                    return acc
                }, {})
            )
        }
    }

    const modalBgColor = useColorModeValue('white', 'gray.600')
    const modalBgGradient = useColorModeValue(
        'linear(to-r, white, gray.200)',
        'linear(to-r, gray.800, gray.700)'
    )
    const modalHeaderTextColor = useColorModeValue('black.900', 'cyan.300')
    const modalHeaderColor = useColorModeValue('blackAlpha.300', 'blackAlpha.500')

    const [{ error }, validation] = useValidation([validateForm])
    const titleError = error?.['title'] || error?.['all']
    const startError = error?.['start'] || error?.['all']
    const endError = error?.['end'] || error?.['all']
    const notesError = error ? ['notes'] || error?.['all']

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior='inside'>
            <ModalOverlay bg='blackAlpha.400' backdropFilter='blur(2px) invert(10%)' />

            <Form
                touched
                initialState={initialValues}
                onSubmit={onSubmit}
                {...validation}
        </Modal>
    )
}

export default UseTheModalForm
