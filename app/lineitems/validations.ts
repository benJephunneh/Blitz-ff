import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

const id = z.number()
const name = z.string()
const cost = z.string() // Represent as cents or dollars?
const quantity = z.number()
export const notes = z.string()
const query = z.string()

export const LineItemSkeleton = z.object({
  name,
  cost,
  quantity,
})

export const CreateLineItem = LineItemSkeleton.extend({ notes: notes.nullable().optional() })
export const UpdateLineItem = CreateLineItem.extend({ id })
export const DeleteLineItem = z.object({ id })
export const FindLineItem = z.object({ query })
