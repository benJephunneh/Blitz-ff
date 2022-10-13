import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

const firstname = z.string()
const lastname = z.string()
const companyname = z.string()
export const email = z.string().email()
export const notes = stashContentSchema
// .refine((query) => useQuery(checkUniquity, { query }, { suspense: true }), {
// checkUniquity({ email }).catch((e) => console.log(`checkUniquity error: ${e}`)),
// message: "Email is not unique.",
// })
// const email = await emailSchema.parseAsync(query)
// export const phone = z.string().min(7).max(10)
const id = z.number()

export const CreateCustomerSkeleton = z.object({
  firstname,
  lastname,
  companyname: companyname.optional(),
  email,
})

export const CreateCustomer = z.object({
  firstname,
  lastname,
  companyname: companyname.optional(),
  email,
  notes: notes.nullable(),
})
export const UpdateCustomer = CreateCustomer.extend({ id })

export const CreateCustomerStash = z.object({
  firstname: firstname.optional(),
  lastname: lastname.optional(),
  companyname: companyname.optional(),
  email: email.optional(),
  notes,
})
export const UpdateCustomerStash = CreateCustomerStash.extend({ id })

export const DeleteCustomer = z.object({ id })
export const ArchiveCustomer = z.object({ id })
// export interface ICustomer {
//   firstname: string
//   lastname: string
//   companyname: string | undefined
//   displayname: string
//   email: string
// }

// export interface ICustomerStash extends Partial<ICustomer> {
//   notes: string
//   userId: number
// }

// export type CustomerCreation = ICustomer | ICustomerStash
// export declare function CustomerOrStash(): CustomerCreation
