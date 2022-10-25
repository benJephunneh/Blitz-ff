import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

const firstname = z.string()
const lastname = z.string()
const companyname = z.string()
export const email = z.string().email()
const notes = stashContentSchema
export const textNotes = z.string()
// .refine((query) => useQuery(checkUniquity, { query }, { suspense: true }), {
// checkUniquity({ email }).catch((e) => console.log(`checkUniquity error: ${e}`)),
// message: "Email is not unique.",
// })
// const email = await emailSchema.parseAsync(query)
// export const phone = z.string().min(7).max(10)
export const id = z.number()

export const CustomerSkeleton = z.object({
  firstname,
  lastname,
  companyname: companyname.nullable(),
  email,
})
export const CustomerFormSchema = CustomerSkeleton.partial().extend({
  notes: textNotes.nullable().optional(),
})

export const CreateCustomer = CustomerSkeleton.extend({
  notes: textNotes.nullable().optional(),
})
export const CreateCustomerStash = CustomerSkeleton.partial({
  firstname: true,
  lastname: true,
}).extend({
  notes: textNotes,
})

export const UpdateCustomer = CreateCustomer.extend({ id })
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
