export type Subscription = { [key: string]: boolean }
export type Subscriber<V> = (value: V) => void
export type UseTheFormIsEqual = (a: any, b: any) => boolean
export interface AnyUseTheFormObject {
  [key: string]: any
}
export type UseTheFormValidationErrors = AnyUseTheFormObject | undefined
export type UseTheFormSubmissionErrors = AnyUseTheFormObject | undefined

export interface UseTheFormSubscription {
  active?: boolean
  dirty?: boolean
  dirtyFields?: boolean
  dirtyFieldsSinceLastSubmit?: boolean
  dirtySinceLastSubmit?: boolean
  modifiedSinceLastSubmit?: boolean
  error?: boolean
  errors?: boolean
  hasSubmitErrors?: boolean
  hasValidationErrors?: boolean
  initialValues?: boolean
  invalid?: boolean
  modified?: boolean
  pristine?: boolean
  submitError?: boolean
  submitErrors?: boolean
  submitFailed?: boolean
  submitting?: boolean
  submitSucceeded?: boolean
  touched?: boolean
  valid?: boolean
  validating?: boolean
  values?: boolean
  visited?: boolean
}

export interface UseTheFormState<FormValues, InitialFormValues = Partial<FormValues>> {
  // by default: all values are subscribed. if subscription is specified, some values may be undefined
  active: undefined | keyof FormValues
  dirty: boolean
  dirtyFields: { [key: string]: boolean }
  dirtyFieldsSinceLastSubmit: { [key: string]: boolean }
  dirtySinceLastSubmit: boolean
  error: any
  errors: UseTheFormValidationErrors
  hasSubmitErrors: boolean
  hasValidationErrors: boolean
  initialValues: InitialFormValues
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
  values: FormValues
  visited?: { [key: string]: boolean }
}

export type UseTheFormSubscriber<FormValues, InitialFormValues = Partial<FormValues>> = Subscriber<
  UseTheFormState<FormValues, InitialFormValues>
>

export interface UseTheFormFieldState<FieldValue> {
  active?: boolean
  blur: () => void
  change: (value: FieldValue | undefined) => void
  data?: AnyUseTheFormObject
  dirty?: boolean
  dirtySinceLastSubmit?: boolean
  error?: any
  focus: () => void
  initial?: FieldValue
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
  value?: FieldValue
  visited?: boolean
}

export interface UseTheFormFieldSubscription {
  active?: boolean
  data?: boolean
  dirty?: boolean
  dirtySinceLastSubmit?: boolean
  error?: boolean
  initial?: boolean
  invalid?: boolean
  length?: boolean
  modified?: boolean
  modifiedSinceLastSubmit?: false
  pristine?: boolean
  submitError?: boolean
  submitFailed?: boolean
  submitSucceeded?: boolean
  submitting?: boolean
  touched?: boolean
  valid?: boolean
  validating?: boolean
  value?: boolean
  visited?: boolean
}

export type UseTheFormFieldSubscriber<FieldValue> = Subscriber<UseTheFormFieldState<FieldValue>>
export type UseTheFormSubscribers<T extends Object> = {
  index: number
  entries: {
    [key: number]: {
      subscriber: Subscriber<T>
      subscription: Subscription
      notified: boolean
    }
  }
}

export type UnsubscribeUseTheForm = () => void

export type UseTheFormFieldValidator<FieldValue> = (
  value: FieldValue,
  allValues?: object,
  meta?: UseTheFormFieldState<FieldValue>
) => any | Promise<any>
export type GetUseTheFormFieldValidator<FieldValue> = () =>
  | UseTheFormFieldValidator<FieldValue>
  | undefined

export interface UseTheFormFieldConfig<FieldValue> {
  afterSubmit?: () => void
  beforeSubmit?: () => void | false
  data?: any
  defaultValue?: any
  getValidator?: GetUseTheFormFieldValidator<FieldValue>
  initialValue?: any
  isEqual?: UseTheFormIsEqual
  silent?: boolean
  validateFields?: string[]
}

export type RegisterUseTheFormField<FormValues> = <F extends keyof FormValues>(
  name: F,
  subscriber: UseTheFormFieldSubscriber<FormValues[F]>,
  subscription: UseTheFormFieldSubscription,
  config?: UseTheFormFieldConfig<FormValues[F]>
) => UnsubscribeUseTheForm

export interface InternalUseTheFormFieldState<FieldValue> {
  active: boolean
  blur: () => void
  change: (value: any) => void
  data: AnyUseTheFormObject
  focus: () => void
  isEqual: UseTheFormIsEqual
  lastFieldState?: UseTheFormFieldState<FieldValue>
  length?: any
  modified: boolean
  modifiedSinceLastSubmit: boolean
  name: string
  touched: boolean
  validateFields?: string[]
  validators: {
    [index: number]: GetUseTheFormFieldValidator<FieldValue>
  }
  valid: boolean
  validating: boolean
  visited: boolean
}

export interface InternalUseTheFormFormState {
  active?: string
  dirtySinceLastSubmit: boolean
  modifiedSinceLastSubmit: boolean
  error?: any
  errors: UseTheFormValidationErrors
  initialValues?: object
  lastSubmittedValues?: object
  pristine: boolean
  resetWhileSubmitting: boolean
  submitError?: any
  submitErrors?: object
  submitFailed: boolean
  submitSucceeded: boolean
  submitting: boolean
  valid: boolean
  validating: number
  values: object
}

type UseTheFormConfigKey = keyof UseTheFormConfig

export interface UseTheFormApi<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>
> {
  batch: (fn: () => void) => void
  blur: (name: keyof FormValues) => void
  change: <F extends keyof FormValues>(name: F, value?: FormValues[F]) => void
  destroyOnUnregister: boolean
  focus: (name: keyof FormValues) => void
  initialize: (data: InitialFormValues | ((values: FormValues) => InitialFormValues)) => void
  isValidationPaused: () => boolean
  getFieldState: <F extends keyof FormValues>(
    field: F
  ) => UseTheFormFieldState<FormValues[F]> | undefined
  getRegisteredFields: () => string[]
  getState: () => UseTheFormState<FormValues, InitialFormValues>
  mutators: Record<string, (...args: any[]) => any>
  pauseValidation: () => void
  registerField: RegisterUseTheFormField<FormValues>
  reset: (initialValues?: InitialFormValues) => void
  resetFieldState: (name: keyof FormValues) => void
  restart: (initialValues?: InitialFormValues) => void
  resumeValidation: () => void
  setConfig: <K extends UseTheFormConfigKey>(
    name: K,
    value: UseTheFormConfig<FormValues>[K]
  ) => void
  submit: () => Promise<FormValues | undefined> | undefined
  subscribe: (
    subscriber: UseTheFormSubscriber<FormValues>,
    subscription: UseTheFormSubscription
  ) => UnsubscribeUseTheForm
}

export type DebugUseTheFormFunction<FormValues, InitialFormValues = Partial<FormValues>> = (
  state: UseTheFormState<FormValues, InitialFormValues>,
  fieldStates: { [key: string]: UseTheFormFieldState<any> }
) => void

export interface MutableUseTheFormState<FormValues, InitialFormValues = Partial<FormValues>> {
  fieldSubscribers: { [key: string]: UseTheFormSubscribers<UseTheFormFieldState<any>> }
  fields: {
    [key: string]: InternalUseTheFormFieldState<any>
  }
  formState: InternalUseTheFormFormState
  lastFormState?: UseTheFormState<FormValues, InitialFormValues>
}

export type GetUseTheFormIn = (state: object, complexKey: string) => any
export type SetUseTheFormIn = (state: object, key: string, value: any) => object
export type ChangeUseTheFormValue<FormValues = object, InitialFormValues = Partial<FormValues>> = (
  state: MutableUseTheFormState<FormValues, InitialFormValues>,
  name: string,
  mutate: (value: any) => any
) => void
export type RenameUseTheFormField<FormValues = object, InitialFormValues = Partial<FormValues>> = (
  state: MutableUseTheFormState<FormValues, InitialFormValues>,
  from: string,
  to: string
) => void
export interface UseTheFormTools<FormValues, InitialFormValues = Partial<FormValues>> {
  changeValue: ChangeUseTheFormValue<FormValues, InitialFormValues>
  getIn: GetUseTheFormIn
  renameField: RenameUseTheFormField<FormValues, InitialFormValues>
  resetFieldState: (name: string) => void
  setIn: SetUseTheFormIn
  shallowEqual: UseTheFormIsEqual
}

export type UseTheFormMutator<FormValues = object, InitialFormValues = Partial<FormValues>> = (
  args: any,
  state: MutableUseTheFormState<FormValues, InitialFormValues>,
  tools: UseTheFormTools<FormValues, InitialFormValues>
) => any

export interface UseTheFormConfig<FormValues = object, InitialFormValues = Partial<FormValues>> {
  debug?: DebugUseTheFormFunction<FormValues, InitialFormValues>
  destroyOnUnregister?: boolean
  initialValues?: InitialFormValues
  keepDirtyOnReinitialize?: boolean
  mutators?: { [key: string]: UseTheFormMutator<FormValues, InitialFormValues> }
  onSubmit: (
    values: FormValues,
    form: UseTheFormApi<FormValues, InitialFormValues>,
    callback?: (errors?: UseTheFormSubmissionErrors) => void
  ) => UseTheFormSubmissionErrors | Promise<UseTheFormSubmissionErrors> | void
  validate?: (
    values: FormValues
  ) => UseTheFormValidationErrors | Promise<UseTheFormValidationErrors>
  validateOnBlur?: boolean
}

export type UseTheFormDecorator<FormValues = object, InitialFormValues = Partial<FormValues>> = (
  form: UseTheFormApi<FormValues, InitialFormValues>
) => UnsubscribeUseTheForm

export function createForm<FormValues, InitialFormValues = Partial<FormValues>>(
  config: UseTheFormConfig<FormValues>
): UseTheFormApi<FormValues, InitialFormValues>
export const fieldSubscriptionItems: string[]
export const formSubscriptionItems: string[]
export const ARRAY_ERROR: "FINAL_FORM/array-error"
export const FORM_ERROR: "FINAL_FORM/form-error"
export function getIn(state: object, complexKey: string): any
export function setIn(state: object, key: string, value: any): object
export const version: string
export const configOptions: UseTheFormConfigKey[]
