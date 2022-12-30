import { boolean } from "zod"

export interface AnyUseTheFormObject {
    [key: string]: any
}

export type UseTheFormValidationErrors = AnyUseTheFormObject | undefined
export type UseTheFormSubmissionErrors = AnyUseTheFormObject | undefined

export interface UseTheFormState<
    UseTheFormValues,
    InitialUseTheFormValues = Partial<UseTheFormValues>,
> {
    active: undefined | keyof UseTheFormValues
    dirty: boolean
    dirtyFields: { [key: string]: boolean }
    dirtyFieldsSinceLastSubmit: { [key: string]: boolean }
    dirtySinceLastSubmit: boolean
    error: any
    errors: UseTheFormValidationErrors
    hasSubmitErrors: boolean
    hasValidationErrors: boolean
    initialValues: InitialUseTheFormValues
    invalid: boolean
    modified?: { [key: string]: boolean }
    modifiedSinceLastSubmit: boolean
    pristine: boolean
    submitError: any
    submitErrors: UseTheFormSubmissionErrors
    submitFailed: boolean
    submitSucceeded: boolean
    submitting: boolean
    touched?: { [key: string]: boolean }
    valid: boolean
    validating: boolean
    values: UseTheFormValues
    visited?: { [key: string]: boolean }
}

export interface UseTheFormFieldState<UseTheFormFieldValue> {
    active?: boolean
    blur: () => void
    change: (value: UseTheFormFieldValue | undefined) => void
    data?: AnyUseTheFormObject
    dirty?: boolean
    dirtySinceLastSubmit?: boolean
    error?: any
    focus: () => void
    initial?: UseTheFormFieldValue
    invalid?: boolean
    length?: number
    modified?: boolean
    modifiedSinceLastSubmit?: boolean
    name: string
    pristine?: boolean
    submitError?: any
    submitFailed?: boolean
    submitSucceeded?: boolean
    submitting?: boolean
    touched?: boolean
    valid?: boolean
    validating?: boolean
    value?: UseTheFormFieldValue
    visited?: boolean
}

export type DebugUseTheFormFunction<
    UseTheFormValues,
    InitialUseTheFormValues = Partial<UseTheFormValues>,
> = (
    state: UseTheFormState<UseTheFormValues, InitialUseTheFormValues>,
    fieldStates: { [key: string]: UseTheFormFieldState<any> },
) => void

export interface UseTheFormMutableState<
    UseTheFormValues,
    InitialUseTheFormValues = Partial<UseTheFormValues>,
> {
    fieldSubscribers: { [key: string]: Subscribers<UseTheFormFieldState<any>> }
}

export type UseTheFormMutator<
    UseTheFormValues = object,
    InitialUseTheFormValues = Partial<UseTheFormValues>
> = (
    args: any,
    state: MutableState<UseTheFormValues, InitialUseTheFormValues>,
)

export interface UseTheFormConfig<
UseTheFormValues = object,
InitialUseTheFormValues = Partial<UseTheFormValues>,
> {
    debug?: DebugUseTheFormFunction<UseTheFormValues, InitialUseTheFormValues>
    destroyOnUnregister?: boolean
    initialValues?: InitialUseTheFormValues
    keepDirtyOnyReinitialize?: boolean
    mutators?: { [key: string]: Mutator }
}
export interface UseTheFormProps<
    UseTheFormValues = Record<string, any>,
    InitialUseTheFormValues = Partial<UseTheFormValues>,
    > extends UseTheFormConfig
