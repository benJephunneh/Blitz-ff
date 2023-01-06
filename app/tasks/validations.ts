import { z } from "zod"

const id = z.number()
const title = z.string()
const notes = z.string()
const query = z.string()

export const TaskSkeleton = z.object({
  title,
  notes,
})

export const FullTask = TaskSkeleton.extend({ id })
export const TaskFormSchema = TaskSkeleton
export const CreateTask = TaskSkeleton
export const UpdateTask = TaskSkeleton.partial().extend({ id })
export const DeleteTask = z.object({ id })
export const FindTask = z.object({ query })
