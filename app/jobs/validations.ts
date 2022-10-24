import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z, ZodDate } from "zod"

export const id = z.number()
export const title = z.string()
// export const range = z.array(z.date())
export const start = z.date()
export const end = z.date()
export const locationId = z.number()
const notes = stashContentSchema
export const textNotes = z.string()

export const JobSkeleton = z.object({
  title,
  start: start.nullable(),
  end: end.nullable(),
  locationId,
})
export const CreateJob = JobSkeleton.extend({
  notes: textNotes.nullable(),
})
export const CreateJobStash = JobSkeleton.partial().extend({
  notes: textNotes,
})

export const UpdateJob = CreateJob.extend({ id })
export const UpdateJobStash = CreateJobStash.extend({ id })

export const DeleteJob = z.object({ id })
export const ArchiveJob = z.object({ id })
