import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"

const GetLocations = z.object({
  customerId: z.number().optional(),
})
interface GetLocationsInput
  extends Pick<Prisma.LocationFindManyArgs, "where" | "orderBy" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  // resolver.zod(GetLocations),

  async ({ where, orderBy }: GetLocationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    return await db.location.findMany({ where, orderBy })
  }
)
