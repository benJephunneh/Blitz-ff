import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateLocation } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateLocation),
  resolver.authorize(),
  async ({ primary, house, street, city, state, zipcode, block, lot, parcel, customerId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.create({
      data: {
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
      },
    })
    await db.locationArchive.create({
      data: {
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
      },
    })

    return location
  }
)
