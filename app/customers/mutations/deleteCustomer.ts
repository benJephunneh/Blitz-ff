import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { DeleteCustomer } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteCustomer),
  resolver.authorize(["Admin", "Owner"]),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    // DO NOT delete invoices
    // Instead, if there is an outstanding balanace, do not allow deletion of customer.

    // await db.estimate.deleteMany({ where: { customerId: id } })

    // If there are jobs on the schedule, cancel them, then:
    // await db.job.deleteMany({ where: { customerId: id } })

    await db.customer.delete({ where: { id } })

    return
  }
)
