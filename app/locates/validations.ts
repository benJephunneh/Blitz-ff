import { z } from "zod"

const id = z.number()
const submitted = z.date()
const number = z.number()
const location = z.string()
const notes = z.string()

const jobId = z.number()
const jobarchiveId = z.number()
// const query = z.string()

export const LocateSkeleton = z.object({
  submitted,
  number,
  location,
  notes,
})

export const FullLocate = LocateSkeleton.extend({ id, jobId })
export const CreateLocate = LocateSkeleton.extend({
  jobId: jobId.optional(),
  jobarchiveId: jobarchiveId.optional(),
})
export const UpdateLocate = LocateSkeleton.partial().extend({ id })
export const DeleteLocate = z.object({ id })
// export const FindLocate = z.object({ query })
