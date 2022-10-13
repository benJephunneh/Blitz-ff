import { resolver } from "@blitzjs/rpc"
import db from "db"
import UniquityError from "../errors/uniquityError"
import { CreateCustomerSkeleton, notes } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateCustomerSkeleton.extend({ notes: notes.nullable() })),
  resolver.authorize(),

  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const displayname = `${input.firstname} ${input.lastname}`
    const { notes, ...values } = input

    const email = await db.customer.findFirst({
      where: {
        email: input.email,
      },
      select: {
        email: true,
      },
    })

    if (email) throw new UniquityError()

    const customer = await db.customer.create({
      data: {
        displayname,
        notes: JSON.stringify(notes),
        ...values,
      },
    })
    await db.customerArchive.create({
      data: {
        displayname,
        notes: JSON.stringify(notes),
        ...values,
      },
    })

    return customer
  }
)
