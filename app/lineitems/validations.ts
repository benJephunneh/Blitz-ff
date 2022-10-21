import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

const id = z.number()
const name = z.string()
const cost = z.number() // cents
const quantity = z.number()
export const notes = stashContentSchema
const query = z.string()

export const LineItemSkeleton = z.object({
  name,
  cost,
  quantity,
})

export const CreateLineItem = LineItemSkeleton.extend({ id, notes: notes.nullable() })
export const UpdateLineItem = LineItemSkeleton.extend({ id, notes: notes.nullable() })
export const DeleteLineItem = LineItemSkeleton.extend({ id })
export const FindLineItem = z.object({ query })
