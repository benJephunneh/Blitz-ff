import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
import stashContentSchema from "../schema/stashContentSchema"

const UpdateStash = z.object({
  id: z.number(),
  body: stashContentSchema.nullable(),
  type: z.enum(["Customer", "Location", "Job", "Invoice", "Estimate"]),
})

export default resolver.pipe(
  resolver.zod(UpdateStash),
  resolver.authorize(),

  async ({ id, body, type }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const oldStash = await db.stash.findUnique({ where: { id } })
    if (!oldStash) return new NotFoundError()

    const stash = await db.stash.update({
      where: { id },
      data: {
        userId: ctx.session.userId,
        body: JSON.stringify(body),
        type,
      },
    })

    return stash
  }
)
