import { ModalProps } from "@chakra-ui/react"
import { JobFormSchema } from "app/jobs/validations"
import { ReactNode } from "react"
import { AnyZodObject, z } from "zod"

type UseTheFormProps = {
    isOpen: boolean
    onClose: () => void
    size?: ModalProps['size']
    title: string
    submitText?: string
    disableStash?: boolean

    schema: AnyZodObject
    initialValues: z.infer<typeof JobFormSchema>
    children?: ReactNode
}

const UseTheForm
