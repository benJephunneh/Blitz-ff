import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Location } from "db"
import { z } from "zod"

const GetLocation = z.object({
  id: z.number().optional(),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(GetLocation),

  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.findFirst({
      where: { id },
    })

    if (!location) {
      if (!!id) {
        throw new NotFoundError(`LocationId ${id} not found.`)
      } else {
        return {} as Location
      }
    }

    return location
  }
)
