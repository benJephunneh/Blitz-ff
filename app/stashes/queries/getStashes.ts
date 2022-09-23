import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetStashesInput
  extends Pick<Prisma.StashFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, orderBy }: GetStashesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const stashes = await db.stash.findMany({ where, orderBy })
    const count = stashes.length

    return {
      stashes,
      count,
    }
  }
)
