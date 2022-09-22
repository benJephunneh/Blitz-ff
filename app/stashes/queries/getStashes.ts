import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetStashesInput
  extends Pick<Prisma.StashFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStashesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: stashes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.stash.count({ where }),
      query: (paginateArgs) => db.stash.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      stashes,
      nextPage,
      hasMore,
      count,
    }
  }
)
