import { z } from "zod"

export const firstname = z.string()
export const lastname = z.string()
export const id = z.number()

export const CreateCustomer = z.object({
  firstname,
  lastname,
})

export const UpdateCustomer = z.object({
  id,
  firstname,
  lastname,
})

export const DeleteCustomer = z.object({
  id,
})

export const ArchiveCustomer = z.object({
  id,
})
