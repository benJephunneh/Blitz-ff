import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCustomer } from "../validations"

export default resolver.pipe(resolver.zod(CreateCustomer), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  let displayName = ""
  if (input.firstname) {
    displayName = input.firstname
    if (input.lastname) {
      displayName.concat(input.lastname)
    }
  } else if (input.companyname) {
    displayName = input.companyname
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
