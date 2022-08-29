import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Location, Prisma } from "db"
import { z } from "zod"

interface GetCustomersInput
  extends Pick<Prisma.CustomerFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, include }: GetCustomersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: customers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.customer.count({ where }),
      query: (paginateArgs) => db.customer.findMany({ ...paginateArgs, where, orderBy, include }),
    })

    return {
      customers,
      nextPage,
      hasMore,
      count,
    }
  }
)
