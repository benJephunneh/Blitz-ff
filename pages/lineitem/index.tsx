import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { LineItem } from "@prisma/client"
// import createLineItem from "app/lineitems/mutations/createLineItem"
// import updateLineItem from "app/lineitems/mutations/updateLineItem"
// import findLineItem from "app/lineitems/queries/findLineItem"
// import { CreateLineItem, LineItemSkeleton, notes } from "app/lineitems/validations"
import { useState } from "react"
import { Form as FinalForm, Field } from "react-final-form"

const LineItemPage: BlitzPage = () => {
  // const [createLineItemMutation] = useMutation(createLineItem)
  // const [updateLineItemMutation] = useMutation(updateLineItem)
  const [lineItem, setLineItem] = useState<LineItem>()
  const [id, setId] = useState<number>()
  const [name, setName] = useState<string>()
  const [cost, setCost] = useState<number | null>()
  const [notes, setNotes] = useState<string | null>()
  const [query, setQuery] = useState("")

  // const [items, { isLoading }] = useQuery(
  //   findLineItem,
  //   { query },
  //   { refetchInterval: 2000, suspense: false, enabled: !!query }
  // )

  // const onSubmit = async (values) => {
  //   const { cost, ...vals } = values
  //   // console.log(JSON.stringify(values, null, 2))
  //   const li = await createLineItemMutation({ ...vals, cost: Number(cost) })

  //   setLineItem(undefined)
  // }

  const initialValues = {
    name: lineItem?.name,
    cost: lineItem?.cost,
    quantity: 1,
    notes: lineItem?.notes,
  }

  return (
    <div>
      <p>See console for log.</p>
    </div>
  )
}

LineItemPage.authenticate = { redirectTo: Routes.Home() }
// LineItemPage.getLayout = (page) => (
//   <HeaderLayout
//     title="Line item definition form"
//     description="Define line items for use in invoices and estimates"
//   >
//     {page}
//   </HeaderLayout>
// )
export default LineItemPage
