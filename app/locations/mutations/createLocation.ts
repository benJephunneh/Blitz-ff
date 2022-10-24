import { resolver } from "@blitzjs/rpc"
import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import db from "db"
import { z } from "zod"
import { CreateLocation } from "../validations"

// const CreateLocationZod = z.object({
//   customerId: z.number(),
//   locationInput: CreateLocation,
// })

export default resolver.pipe(
  resolver.zod(CreateLocation),
  resolver.authorize(),

  async (data, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const { notes } = locationInput
    const location = await db.location.create({
      data: {
        userId: ctx.session.userId,
        ...data,
      },
    })
    await db.locationArchive.create({ data })

    return location
  }
)
