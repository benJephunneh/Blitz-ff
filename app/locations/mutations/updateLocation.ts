import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { CreateLocation, UpdateLocation } from "../validations"

const UpdateLocationZod = z.object({
  id: z.number(),
  locationInput: CreateLocation,
})

export default resolver.pipe(
  resolver.zod(UpdateLocationZod),
  resolver.authorize(),
  async ({ id, locationInput }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.update({
      where: { id },
      data: {
        ...locationInput,
      },
    })
    await db.locationArchive.update({
      where: { id },
      data: {
        ...locationInput,
      },
    })

    return location
  }
)
