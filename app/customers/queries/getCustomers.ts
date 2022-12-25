import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetCustomersInput
  extends Pick<Prisma.CustomerFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, orderBy, skip, take }: GetCustomersInput) => {
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
      query: (paginateArgs) => db.customer.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      customers,
      nextPage,
      hasMore,
      count,
    }
  }
)
