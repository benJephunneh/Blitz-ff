import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { z } from "zod"

interface GetCustomerOranizerInput
  extends Pick<
    Prisma.CustomerFindFirstArgs,
    "where" | "select" | "orderBy" | "skip" | "take" | "include"
  > {}

const GetCustomer = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
  id: z.number(),
})

export default resolver.pipe(resolver.authorize(), resolver.zod(GetCustomer), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.findFirst({
    where: { id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      locations: {
        orderBy: [
          { primary: "asc" },
          { zipcode: "asc" },
          { city: "asc" },
          { street: "asc" },
          { house: "asc" },
        ],
        select: {
          id: true,
          house: true,
          street: true,
          city: true,
          zipcode: true,
          block: true,
          lot: true,
          parcel: true,
          primary: true,
        },
      },
    },
  })

  if (!customer) throw new NotFoundError(`CustomerId ${id} not found.`)

  return customer
})
