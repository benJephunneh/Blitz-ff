import { resolver } from "@blitzjs/rpc"
import db, { StashType } from "db"
import { z } from "zod"

const DeleteStash = z.object({
  id: z.number(),
  stashType: z.nativeEnum(StashType),
})

export default resolver.pipe(
  resolver.zod(DeleteStash),
  resolver.authorize(["Admin", "Owner"]),
  async ({ id, stashType }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    switch (stashType) {
      case "Customer":
        await db.customerStash.delete({ where: { id } })
        break
      case "Location":
        await db.locationStash.delete({ where: { id } })
        break
      case "Job":
        await db.jobStash.delete({ where: { id } })
        break

      default:
        break
    }

    return
  }
)
