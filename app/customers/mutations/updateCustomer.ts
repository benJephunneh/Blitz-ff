import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCustomer } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateCustomer),
  resolver.authorize(),

  async ({ id, ...input }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const { id, notes, ...values } = input

    const newDisplayname = `${input.firstname} ${input.lastname}`
    const displayname = await db.customer.findFirst({
      where: { id },
      select: { displayname: true },
    })

    const data = {
      displayname:
        displayname?.displayname !== newDisplayname ? newDisplayname : displayname.displayname,
      ...input,
    }

    const customer = await db.customer.update({ where: { id }, data })
    await db.customerArchive.update({ where: { id }, data })

    return customer
  }
)
