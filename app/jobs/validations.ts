import { LineItem, Prisma } from "@prisma/client"
import getLineItems from "app/lineitems/queries/getLineItems"
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
const notes = z.string()

const jobValidator = Prisma.validator<Prisma.JobArgs>()({
  include: {
    lineitems: true,
  },
})
export type JobType = Prisma.JobGetPayload<typeof jobValidator>
export const isJobWithLineitems = (x: any): x is JobType =>
  Object.hasOwn(x, "completed") && Object.hasOwn(x, "lineitems")

const jobStashValidator = Prisma.validator<Prisma.JobStashArgs>()({
  include: {
    lineitems: true,
  },
})
export type jobStashType = Prisma.JobStashGetPayload<typeof jobValidator>
export const isJobStashWithLineitems = (x: any): x is jobStashType =>
  Object.hasOwn(x, "completed") && Object.hasOwn(x, "lineitems")

const lineitemValidator = Prisma.validator<Prisma.LineItemArgs>()({})
type lineitemType = Prisma.LineItemGetPayload<typeof lineitemValidator>
const isLineitem = (x: any): x is lineitemType => x.quantity !== undefined
// const isLineitem = (x: any): x is LineItem => x.quantity !== undefined
const lineitem = z.custom<LineItem>((val) => isLineitem(val))

export const JobSkeleton = z.object({
  title,
  start: start.nullable().optional(),
  end: end.nullable().optional(),
  completed,
  lineitems: lineitem.array().optional(),
})
export const JobFormSchema = JobSkeleton.partial().extend({
  notes: notes.nullable().optional(),
})
export const CreateJob = JobSkeleton.extend({
  customerId,
  locationId,
  notes: notes.nullable().optional(),
})
export const CreateJobStash = JobSkeleton.partial().extend({
  customerId,
  locationId,
  notes: notes,
})

export const UpdateJob = CreateJob.partial().extend({ id })
export const UpdateJobStash = CreateJobStash.extend({ id })

export const DeleteJob = z.object({ id })
export const ArchiveJob = z.object({ id })

export const GetJobsSchema = z.object({
  customerId: customerId.optional(),
  locationId: locationId.optional(),
})
