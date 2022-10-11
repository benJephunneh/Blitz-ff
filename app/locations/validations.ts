import { LocationType, StashType } from "@prisma/client"
import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

export const id = z.number()
export const primary = z.boolean()
// export const email = z.string().email()
export const house = z.string()
export const street = z.string()
export const city = z.string()
export const state = z.string()
export const zipcode = z.string()
export const phones = z.string() // .array() ??? or should it be .array().optional()?  I.e. phones?[] or phones[]?
export const block = z.string()
export const lot = z.string()
export const parcel = z.string()
export const locationType = z.nativeEnum(LocationType)
// export const customerId = z.number()
const notes = stashContentSchema // .nullable()
const stashType = z.nativeEnum(StashType)

export const CreateLocation = z.object({
  primary,
  house: house.optional(),
  street,
  city,
  state,
  zipcode,
  phones,
  block: block.optional(),
  lot: lot.optional(),
  parcel: parcel.optional(),
  locationType,
  // customerId,
})
export const UpdateLocation = CreateLocation.extend({ id })

export const CreateLocationStash = z.object({
  primary,
  house: house.optional(),
  street: street.optional(),
  city: city.optional(),
  state: state.optional(),
  zipcode: zipcode.optional(),
  phones: phones.optional(),
  block: block.optional(),
  lot: lot.optional(),
  parcel: parcel.optional(),
  locationType,
  notes,
})

export const UpdateLocationStash = CreateLocationStash.extend({ id })

export const DeleteLocation = z.object({ id })
export const ArchiveLocation = z.object({ id })
