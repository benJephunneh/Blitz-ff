import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
import stashBodySchema from "../schemas/stashBodySchema"

const UpdateStash = z.object({
  id: z.number(),
  body: stashBodySchema.nullable(),
})

export default resolver.pipe(
  resolver.zod(UpdateStash),
  resolver.authorize(),

  async ({ id, body }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const oldStash = await db.stash.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!oldStash) throw new NotFoundError()

    const userId = ctx.session.userId

    const stash = await db.stash.update({
      where: { id },
      data: {
        body: JSON.stringify(body), // hikerherd has, essentially, body: body && JSON.stri...
        userId,
      },
    })

    return stash
  }
)
