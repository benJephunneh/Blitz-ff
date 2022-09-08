import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetLocationsInput
  extends Pick<Prisma.LocationFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, orderBy }: GetLocationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const locations = await db.location.findMany({ where, orderBy })
    const count = locations.length

    return {
      locations,
      count,
    }
  }
)
