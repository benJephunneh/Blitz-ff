import { resolver } from "@blitzjs/rpc"
import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import db from "db"
import { z } from "zod"
import { CreateLocation } from "../validations"

const CreateLocationZod = z.object({
  customerId: z.number(),
  locationInput: CreateLocation,
})

export default resolver.pipe(
  resolver.zod(CreateLocationZod),
  resolver.authorize(),

  async ({ customerId, locationInput }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { notes } = locationInput
    const location = await db.location.create({
      data: {
        customerId,
        notes: notes && JSON.stringify(notes),
        ...locationInput,
      },
    })
    await db.locationArchive.create({
      data: {
        customerId,
        notes: notes && JSON.stringify(notes),
        ...locationInput,
      },
    })

    return location
  }
)
