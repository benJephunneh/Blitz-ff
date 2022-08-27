import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetLocation = z.object({
  // This accepts type of undefined, but is required at runtime
  customerId: z.number().optional().refine(Boolean, "Required"),
  primary: z.boolean().optional().refine(Boolean, "required"),
})

export default resolver.pipe(
  resolver.zod(GetLocation),
  resolver.authorize(),
  async ({ customerId, primary }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.findFirst({
      where: { customerId, primary },
    })

    if (!location) throw new NotFoundError()

    return location
  }
)
