import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateLocation } from "../validations"

// const UpdateLocationZod = z.object({
//   id: z.number(),
//   locationInput: CreateLocation,
// })

export default resolver.pipe(
  resolver.zod(UpdateLocation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.update({ where: { id }, data })
    await db.locationArchive.update({ where: { id }, data })

    return location
  }
)
