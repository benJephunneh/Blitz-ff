import { Prisma } from "@prisma/client"
import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

const id = z.number()
const notes = z.string()
const number = z.number()
const location = z.string()
const jobId = z.number()
const submitted = z.date()
// .refine((query) => useQuery(checkUniquity, { query }, { suspense: true }), {
// checkUniquity({ email }).catch((e) => console.log(`checkUniquity error: ${e}`)),
// message: "Email is not unique.",
// })
// const email = await emailSchema.parseAsync(query)
// export const phone = z.string().min(7).max(10)

export const LocateSkeleton = z.object({
  number,
  location,
  notes: notes.nullable().optional(),
})
export const LocateFormSchema = LocateSkeleton.extend({
  submitted,
  notes: notes.nullable().optional(),
})

export const CreateLocate = LocateFormSchema.extend({ jobId })
// export const CreateLocateStash = LocateSkeleton.extend({ jobId, notes })

export const UpdateLocate = CreateLocate.extend({
  id,
  number,
  location,
  notes: notes.nullable().optional(),
})
// export const UpdateLocateStash = CreateLocateStash.extend({ id })

export const DeleteLocate = z.object({ id })
export const ArchiveLocate = z.object({ id })
// export interface ILocate {
//   firstname: string
//   lastname: string
//   companyname: string | undefined
//   displayname: string
//   email: string
// }

// export interface ILocateStash extends Partial<ILocate> {
//   notes: string
//   userId: number
// }

// export type LocateCreation = ILocate | ILocateStash
// export declare function LocateOrStash(): LocateCreation

const locate = Prisma.validator<Prisma.LocateArgs>()({})
export type LocateType = Prisma.LocateGetPayload<typeof locate>
