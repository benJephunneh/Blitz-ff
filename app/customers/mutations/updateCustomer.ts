import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCustomer } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateCustomer),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let displayname = ""
    if (data.firstname) {
      displayname = data.firstname
      if (data.lastname) {
        displayname.concat(` ${data.lastname}`)
      }
    } else if (data.companyname) {
      displayname = data.companyname
    }

    const customer = await db.customer.update({
      where: { id },
      data: {
        displayname,
        ...data,
      },
    })
    await db.customerArchive.update({
      where: { id },
      data: {
        displayname,
        ...data,
      },
    })

    return customer
  }
)
