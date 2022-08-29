import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"

const GetLocation = z.object({
  // This accepts type of undefined, but is required at runtime
  customerId: z.number().optional().refine(Boolean, "Required"),
  primary: z.boolean().optional(),
})

interface GetCustomersInput extends Pick<Prisma.CustomerFindFirstArgs, "where"> {}

export default resolver.pipe(resolver.authorize(), async ({ where }: GetCustomersInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const location = await db.location.findFirst({ where })

  if (!location) throw new NotFoundError()

  return location
})
