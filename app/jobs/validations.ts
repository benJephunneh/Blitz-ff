import { LineItem } from "@prisma/client"
import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { FullLineItem } from "app/lineitems/validations"
import { z, ZodDate } from "zod"

export const id = z.number()
export const title = z.string()
// export const range = z.array(z.date())
export const start = z.date()
export const end = z.date()
const completed = z.boolean().default(false)
const customerId = z.number()
const locationId = z.number()
const notes = stashContentSchema
export const textNotes = z.string()
const lineitem = FullLineItem
const lineitems = lineitem.array()

export const JobSkeleton = z.object({
  title,
  start,
  end,
  completed,
  lineitems: lineitems.optional(),
})
export const JobFormSchema = JobSkeleton.partial().extend({
  notes: textNotes.nullable().optional(),
})
export const CreateJob = JobSkeleton.extend({
  notes: textNotes.nullable().optional(),
  customerId,
  locationId,
})
export const CreateJobStash = JobSkeleton.partial().extend({
  notes: textNotes,
  locationId,
})

export const UpdateJob = CreateJob.extend({ id })
export const UpdateJobStash = CreateJobStash.extend({ id })

export const DeleteJob = z.object({ id })
export const ArchiveJob = z.object({ id })
