import { z } from "zod"

export const id = z.number()
export const primary = z.boolean()
// export const email = z.string().email()
export const house = z.string().optional()
export const street = z.string()
export const city = z.string()
export const state = z.string()
export const zipcode = z.string()
export const phones = z.string() // .array() ??? or should it be .array().optional()?  I.e. phones?[] or phones[]?
export const block = z.string().optional()
export const lot = z.string().optional()
export const parcel = z.string().optional()
export const type = z.enum(["Personal", "Business", "Managed"])
export const customerId = z.number()

export const CreateLocation = z.object({
  primary,
  house,
  street,
  city,
  state,
  zipcode,
  phones,
  block,
  lot,
  parcel,
  type,
  customerId,
})

export const UpdateLocation = CreateLocation.extend({
  id,
})

export const DeleteLocation = z.object({
  id,
})
