import { LocationType, StashType } from "@prisma/client"
import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

export const id = z.number()
export const customerId = z.number()
const primary = z.boolean()
// export const email = z.string().email()
const house = z.string()
const street = z.string()
const city = z.string()
const state = z.string()
const zipcode = z.string()
const phones = z.string() // .array() ??? or should it be .array().optional()?  I.e. phones?[] or phones[]?
const block = z.string()
const lot = z.string()
const parcel = z.string()
const locationType = z.nativeEnum(LocationType)
// export const customerId = z.number()
export const notes = stashContentSchema
const stashType = z.nativeEnum(StashType)

export const CreateLocationSkeleton = z.object({
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
})
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
  notes: notes.nullable(),
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
  notes: notes.nullable(),
})

export const UpdateLocationStash = CreateLocationStash.extend({ id })

export const DeleteLocation = z.object({ id })
export const ArchiveLocation = z.object({ id })
