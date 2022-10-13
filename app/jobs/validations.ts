import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

export const id = z.number()
export const title = z.string()
export const start = z.date().optional()
export const end = z.date().optional()
export const locationId = z.number()
const notes = stashContentSchema

export const CreateJob = z.object({
  title,
  start,
  end,
  notes: notes.nullable(),
})
export const UpdateJob = CreateJob.extend({ id })

export const CreateJobStash = z.object({
  title: title.optional(),
  start: start.optional(),
  end: end.optional(),
  notes,
})
export const UpdateJobStash = CreateJobStash.extend({ id })

export const DeleteJob = z.object({ id })
export const ArchiveJob = z.object({ id })
