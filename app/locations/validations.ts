import { z } from "zod"

export const id = z.number()
export const primary = z.boolean()
export const email = z.string().email()
export const phone = z.string()
export const house = z.string().optional()
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
  email,
  phone,
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
  id,
  primary,
  email,
  phone,
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
  id,
})
