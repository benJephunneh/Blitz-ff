import { z } from "zod"

export const id = z.number()
export const title = z.string()
export const start = z.date().optional()
export const end = z.date().optional()

export const CreateJob = z.object({
  title,
})

export const UpdateJob = z.object({
  id,
  title,
  start,
  end,
})

export const DeleteJob = z.object({
  id,
})

export const ArchiveJob = z.object({
  id,
})
