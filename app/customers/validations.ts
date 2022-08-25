import { z } from "zod"

export const firstname = z.string()

export const lastname = z.string()

export const CreateCustomer = z.object({
  firstname,
  lastname,
})

export const UpdateCustomer = z.object({
  id: z.number(),
})

export const DeleteCustomer = z.object({
  id: z.number(),
})
