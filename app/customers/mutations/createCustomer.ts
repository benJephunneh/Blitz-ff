import { resolver } from "@blitzjs/rpc"
import db from "db"
import UniquityError from "../errors/uniquityError"
import { CreateCustomer } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateCustomer),
  resolver.authorize(),

  // async ({ notes, ...values }) => {
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const { notes, ...values } = input
    const email = await db.customer.findFirst({
      where: {
        email: input.email,
      },
      select: {
        email: true,
      },
    })

    if (email) throw new UniquityError()

    const data = {
      displayname: `${input.firstname} ${input.lastname}`,
      ...input,
    }

    const customer = await db.customer.create({
      data: {
        userId: ctx.session.userId,
        ...data,
      },
    })
    await db.customerArchive.create({ data })

    return customer
  }
)
