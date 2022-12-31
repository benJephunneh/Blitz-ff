import { PropsWithoutRef } from "react"
import { TypeOf, z, ZodType } from "zod"
import { FormProps as FinalFormProps, FormRenderProps } from "react-final-form"

type FormProps<S extends ZodType<any>> = PropsWithoutRef<
    Omit<JSX.IntrinsicElements["form"], "onSubmit">
> & {
    schema?: S
    onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
    initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
    render: (props: FormRenderProps<TypeOf<S>>) => JSX.Element
}

export type FormComponent<P = {}> = <S extends ZodType<any>>(props: FormProps<S> & P) => JSX.Element
