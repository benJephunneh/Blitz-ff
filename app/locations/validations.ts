import { LocationType, StashType } from "@prisma/client"
import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { z } from "zod"

const id = z.number()
const customerId = z.number()
const primary = z.boolean().default(true)
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
const locationType = z.nativeEnum(LocationType).default("Personal")
// export const customerId = z.number()
const notes = stashContentSchema
export const textNotes = z.string()
const stashType = z.nativeEnum(StashType)

export const LocationSkeleton = z.object({
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
  locationType,
})
export const CreateLocation = LocationSkeleton.partial({
  house: true,
  block: true,
  lot: true,
  parcel: true,
}).extend({
  customerId,
  notes: textNotes.optional(),
})
export const CreateLocationStash = LocationSkeleton.partial().extend({
  customerId,
  note: textNotes,
})

export const UpdateLocation = CreateLocation.extend({
  id,
})
export const UpdateLocationStash = CreateLocationStash.extend({ id })

export const DeleteLocation = z.object({ id })
export const ArchiveLocation = z.object({ id })
