import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { DeleteCustomer } from "../validations"

export default resolver.pipe(resolver.zod(DeleteCustomer), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.deleteMany({ where: { id } })

  return customer
})
