import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Location, Prisma } from "db"
import { z } from "zod"

// const GetLocation = z.object({
//   id: z.number().optional(),
// })

interface GetLocationProps extends Pick<Prisma.LocationFindFirstArgs, "where" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where }: GetLocationProps) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.findFirst({
      where,
    })

    if (!location) throw new NotFoundError()

    return location
  }
)
