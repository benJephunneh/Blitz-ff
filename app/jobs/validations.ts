import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z, ZodDate } from "zod"

export const id = z.number()
export const title = z.string()
// export const range = z.array(z.date())
export const start = z.date()
export const end = z.date()
export const locationId = z.number()
export const notes = stashContentSchema

export const JobSkeleton = z.object({
  title,
  start,
  end,
})
export const CreateJob = z.object({
  title,
  start,
  end,
  notes: notes.nullable(),
})
export const UpdateJob = CreateJob.extend({ id })

export const CreateJobStash = z.object({
  title: title.optional(),
  // range: range.optional(),
  start: start.optional(),
  end: end.optional(),
  notes,
})
export const UpdateJobStash = CreateJobStash.extend({ id })

export const DeleteJob = z.object({ id })
export const ArchiveJob = z.object({ id })
