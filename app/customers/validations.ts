import { z } from "zod"

const firstname = z.string().optional()
const lastname = z.string().optional()
const companyname = z.string().optional()
export const email = z.string().email()
// .refine((query) => useQuery(checkUniquity, { query }, { suspense: true }), {
// checkUniquity({ email }).catch((e) => console.log(`checkUniquity error: ${e}`)),
// message: "Email is not unique.",
// })
// const email = await emailSchema.parseAsync(query)
// export const phone = z.string().min(7).max(10)
const id = z.number()

export const CreateCustomer = z.object({
  firstname,
  lastname,
  companyname,
  email,
  // phone,
})

export const UpdateCustomer = CreateCustomer.extend({
  id,
})

export const DeleteCustomer = z.object({
  id,
})

export const ArchiveCustomer = z.object({
  id,
})
