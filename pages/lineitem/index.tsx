import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Button, Grid, GridItem, Heading, InputGroup, InputLeftAddon } from "@chakra-ui/react"
import TextAreaField from "app/core/components/forms/components/TextAreaField"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import createLineItem from "app/lineitems/mutations/createLineItem"
import updateLineItem from "app/lineitems/mutations/updateLineItem"
import { LineItemSkeleton, notes } from "app/lineitems/validations"
import { validateZodSchema } from "blitz"
import { Form as FinalForm, Field } from "react-final-form"

const LineItemPage: BlitzPage = () => {
  const [createLineItemMutation] = useMutation(createLineItem)
  const [updateLineItemMutation] = useMutation(updateLineItem)

  const onSubmit = (values) => {
    console.log(JSON.stringify(values))
  }

  const initialValues = {
    name: "",
    cost: 0,
    quantity: 1,
  }

  return (
    <>
      <Heading>Define a new line item</Heading>

      <FinalForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        schema={validateZodSchema(LineItemSkeleton.extend({ notes: notes.nullable() }))}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(6, 1fr)">
              <GridItem colSpan={2} rowEnd={1}>
                <LabeledTextField name="name" label="Line item name" />
              </GridItem>
              <GridItem colSpan={1}>
                <LabeledTextField name="cost" label="Cost" type='price' />
              </GridItem>
              <GridItem colSpan={3} rowStart={1} rowEnd={2}>
                <TextAreaField
                  name='notes'
                  label='Notes'
                  placehodler='Add notes about this line item...'
                />
                {/* <label>Notes</label>
                <Field name="notes" component="textarea" /> */}
              </GridItem>
            </Grid>
            <Button type="submit" disabled={pristine || submitting}>
              Submit
            </Button>

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    </>
  )
}

LineItemPage.authenticate = { redirectTo: Routes.Home() }
LineItemPage.getLayout = (page) => (
  <HeaderLayout
    title="Line item definition form"
    description="Define line items for use in invoices and estimates"
  >
    {page}
  </HeaderLayout>
)
export default LineItemPage
