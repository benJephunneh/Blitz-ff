import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CustomerSkeleton, id, notes } from "../validations"

export default resolver.pipe(
  resolver.zod(CustomerSkeleton.extend({ id, notes: notes.nullable() })),
  resolver.authorize(),

  async ({ id, notes, ...values }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const displayname = `${values.firstname} ${values.lastname}`
    // const { id, notes, ...values } = input

    const customer = await db.customer.update({
      where: { id },
      data: {
        displayname,
        notes: JSON.stringify(notes),
        ...values,
      },
    })
    await db.customerArchive.update({
      where: { id },
      data: {
        displayname,
        notes: JSON.stringify(notes),
        ...values,
      },
    })

    return customer
  }
)
