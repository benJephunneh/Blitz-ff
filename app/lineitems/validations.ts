import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

const id = z.number()
const name = z.string()
const cost = z.number() // Represent as cents or dollars?
const quantity = z.number()
export const notes = z.string()
const query = z.string()

export const LineItemSkeleton = z.object({
  name,
  cost: cost.nullable().optional(),
  quantity,
})

export const FullLineItem = LineItemSkeleton.extend({ id, notes: notes.nullable().optional() })
export const CreateLineItem = LineItemSkeleton.extend({ notes: notes.nullable().optional() })
export const UpdateLineItem = FullLineItem
export const DeleteLineItem = z.object({ id })
export const FindLineItem = z.object({ query })
