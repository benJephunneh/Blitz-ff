import { z } from "zod"

const id = z.number()
const title = z.string()
const notes = z.string()
const query = z.string()

export const LocateSkeleton = z.object({
  title,
  notes,
})

export const FullLocate = LocateSkeleton.extend({ id })
export const CreateLocate = LocateSkeleton
export const UpdateLocate = LocateSkeleton.partial().extend({ id })
export const DeleteLocate = z.object({ id })
export const FindLocate = z.object({ query })
