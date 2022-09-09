import { z } from "zod"

export const firstname = z.string()
export const lastname = z.string()
export const email = z.string().email()
export const phone = z.string().min(7).max(10)
export const id = z.number()

export const CreateCustomer = z.object({
  firstname,
  lastname,
  email,
  phone,
})

export const UpdateCustomer = z.object({
  id,
  firstname,
  lastname,
  email,
  phone,
})

export const DeleteCustomer = z.object({
  id,
})

export const ArchiveCustomer = z.object({
  id,
})
