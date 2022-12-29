import React, { Component, FC, ReactElement, ReactNode } from "react"

import { Form, FormRenderProps } from "react-final-form"

interface Props<Values> {
  initialValues?: Partial<Values>
  onSubmit: (values: Values) => Promise<void>
  pages: ReactElement<WizardPageProps<Values>>[]
  children: (
    props: FormRenderProps<Values> & {
      activePage: ReactElement<WizardPageProps<Values>>
      page: number
      isFirstPage: boolean
      isLastPage: boolean
      totalPage: number
      previous: () => void
    }
  ) => ReactNode
}

interface State<Values> {
  page: number
  values: Partial<Values>
}

interface WizardPageProps<Values> {
  validate?: (values: Partial<Values>) => Partial<Record<keyof typeof values, string>>
  children: ReactNode
}

export function Wizard<Values = Record<string, any>>() {
  abstract class AbstractWizard extends Component<Props<Values>, State<Values>> {
    static Page: FC<WizardPageProps<Values>> = ({ children }) => children

    constructor(props: Props<Values>) {
      super(props)
      this.state = {
        page: 0,
        values: props.initialValues || {},
      }
    }

    next = (values: Partial<Values>) => {
      const { pages } = this.props
      const lastPage = pages.length - 1

      this.setState((state) => ({
        page: Math.min(state.page + 1, lastPage),
        values,
      }))
    }

    previous = () =>
      this.setState((state) => ({
        page: Math.max(state.page - 1, 0),
      }))

    validate = (values: Partial<Values>): Partial<Record<keyof typeof values, string>> => {
      const { pages } = this.props
      const { page } = this.state
      const activePage = pages[page]
      return activePage.props.validate
        ? activePage.props.validate(values)
        : ({} as Partial<Record<keyof typeof values, string>>)
    }

    handleSubmit = (values: Partial<Values>) => {
      const { pages, onSubmit } = this.props
      const { page } = this.state
      const isLastPage = page === pages.length
      if (isLastPage) {
        return onSubmit(values as Values)
      }
      return this.next(values)
    }

    render() {
      const { pages, children } = this.props
      const { page, values } = this.state
      const activePage = pages[page]
      const isFirstPage = page === 0
      const isLastPage = page === pages.length - 1
      const totalPage = pages.length

      return (
        <Form<Values> initialValues={values} validate={this.validate} onSubmit={this.handleSubmit}>
          {(formProps) =>
            children({
              ...formProps,
              activePage,
              page,
              isFirstPage,
              isLastPage,
              totalPage,
              previous: this.previous,
            })
          }
        </Form>
      )
    }
  }
  return AbstractWizard
}
