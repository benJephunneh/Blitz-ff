import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCustomer } from "../validations"

export default resolver.pipe(resolver.zod(CreateCustomer), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.create({ data: input })
  await db.customerArchive.create({ data: input })

  return customer
})
