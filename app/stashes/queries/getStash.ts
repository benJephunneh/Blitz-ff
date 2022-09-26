import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"

// const GetStash = z.object({
//   // This accepts type of undefined, but is required at runtime
//   id: z.number().optional().refine(Boolean, "Required"),
// })

interface GetStashProps extends Pick<Prisma.StashFindFirstArgs, "where" | "select"> {}

export default resolver.pipe(
  // resolver.zod(GetStash),
  resolver.authorize(),
  async ({ where }: GetStashProps) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const stash = await db.stash.findFirst({
      where,
    })

    if (!stash) return null

    return stash
  }
)
