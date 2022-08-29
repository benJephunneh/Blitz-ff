import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { z } from "zod"

interface GetCustomersInput
  extends Pick<Prisma.CustomerFindFirstArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

const GetCustomer = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, include }: GetCustomersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const customer = await db.customer.findFirst({ where, include })

    if (!customer) throw new NotFoundError(`Customer ${where} not found.`)

    return customer
  }
)
