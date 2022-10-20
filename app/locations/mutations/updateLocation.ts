import { resolver } from "@blitzjs/rpc"
import db from "db"
import { LocationSkeleton, id, notes } from "../validations"

// const UpdateLocationZod = z.object({
//   id: z.number(),
//   locationInput: CreateLocation,
// })

export default resolver.pipe(
  resolver.zod(LocationSkeleton.extend({ id, notes: notes.nullable() })),
  resolver.authorize(),
  async ({ id, notes, ...values }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.update({
      where: { id },
      data: {
        notes: JSON.stringify(notes),
        ...values,
      },
    })
    await db.locationArchive.update({
      where: { id },
      data: {
        notes: JSON.stringify(notes),
        ...values,
      },
    })

    return location
  }
)
