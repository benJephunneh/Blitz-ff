import { z } from "zod"

export const id = z.number()
export const primary = z.boolean()
export const house = z.string().nullable()
export const street = z.string()
export const city = z.string()
export const state = z.string()
export const zipcode = z.string()
export const block = z.string().nullable()
export const lot = z.string().nullable()
export const parcel = z.string().nullable()
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
  id,
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
  id,
})

export const ArchiveLocation = z.object({
  id,
})
