import { resolver } from "@blitzjs/rpc"
import db from "db"
import UniquityError from "../errors/uniquityError"
import { CreateCustomer, CreateCustomerStash } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateCustomerStash),
  resolver.authorize(),

  async ({ firstname, lastname, companyname, email, notes }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let displayname = ""
    if (firstname) {
      if (lastname) {
        displayname = `${firstname} ${lastname}`
      } else {
        displayname = firstname
      }
    } else if (companyname) {
      displayname = companyname
    }

    const customerStash = await db.customerStash.create({
      data: {
        userId: ctx.session.userId,
        firstname,
        lastname,
        companyname,
        displayname,
        email,
        notes: JSON.stringify(notes),
      },
    })

    return customerStash
  }
)
