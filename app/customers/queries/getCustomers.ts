import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetCustomersInput
  extends Pick<Prisma.CustomerFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, orderBy, include }: GetCustomersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const customers = await db.customer.findMany({ where, orderBy, include })
    const count = customers.length

    return {
      customers,
      count,
    }
  }
)
