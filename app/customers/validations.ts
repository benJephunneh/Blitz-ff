import { z } from "zod"

export const firstname = z.string().optional()
export const lastname = z.string().optional()
export const companyname = z.string().optional()
export const email = z.string().email()
// export const phone = z.string().min(7).max(10)
export const id = z.number()

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
