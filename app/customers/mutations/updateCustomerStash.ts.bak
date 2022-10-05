import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCustomerStash } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateCustomerStash),
  resolver.authorize(),

  async ({ id, firstname, lastname, companyname, email, notes }, ctx) => {
    let displayname = ""
    if (firstname) {
      displayname = firstname
      if (lastname) {
        displayname.concat(` ${lastname}`)
      }
    } else if (companyname) {
      displayname = companyname
    }

    const customerStash = await db.customerStash.update({
      where: { id },
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
  }
)
