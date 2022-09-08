import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCustomer = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
  id: z.number(),
})

export default resolver.pipe(resolver.authorize(), resolver.zod(GetCustomer), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.findFirst({
    where: { id },
  })

  if (!customer) throw new NotFoundError(`CustomerId ${id} not found.`)

  return customer
})
