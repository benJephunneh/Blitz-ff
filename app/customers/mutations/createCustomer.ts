import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCustomer } from "../validations"

export default resolver.pipe(resolver.zod(CreateCustomer), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  let displayname = ""
  if (input.firstname) {
    displayname = input.firstname
    if (input.lastname) {
      displayname.concat(` ${input.lastname}`)
    }
  } else if (input.companyname) {
    displayname = input.companyname
  }

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
})
