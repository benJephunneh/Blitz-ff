import { z } from "zod"

export const primary = z.boolean()
export const house = z.string()
export const street = z.string()
export const city = z.string()
export const state = z.string()
export const zipcode = z.string()
export const block = z.string().optional()
export const lot = z.string().optional()
export const parcel = z.string().optional()
export const customerId = z.number()

export const CreateLocation = z.object({
  primary,
  house,
  street,
  city,
  state,
  zipcode,
  block,
  lot,
  parcel,
  customerId,
})

export const UpdateLocation = z.object({
  id: z.number(),
  primary,
  house,
  street,
  city,
  state,
  zipcode,
  block,
  lot,
  parcel,
  customerId,
})

export const DeleteLocation = z.object({
  id: z.number(),
})
