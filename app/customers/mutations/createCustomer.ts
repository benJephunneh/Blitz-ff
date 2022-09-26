import { resolver } from "@blitzjs/rpc"
import db from "db"
import UniquityError from "../errors/uniquityError"
import { CreateCustomer } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateCustomer),
  resolver.authorize(),

  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let displayname = ""
    if (input.firstname) {
      if (input.lastname) {
        displayname = `${input.firstname} ${input.lastname}`
      } else {
        displayname = input.firstname
      }
    } else if (input.companyname) {
      displayname = input.companyname
    }

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
        ...input,
      },
    })
    await db.customerArchive.create({
      data: {
        displayname,
        ...input,
      },
    })

    return customer
  }
)
