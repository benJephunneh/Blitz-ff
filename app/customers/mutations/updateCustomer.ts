import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCustomer } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateCustomer),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const customer = await db.customer.update({ where: { id }, data })

    return customer
  }
)
