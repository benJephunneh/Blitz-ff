import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma, StashType } from "db"
import { z } from "zod"

const GetStash = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
  stashType: z.nativeEnum(StashType),
})

// interface GetStashProps extends Pick<Prisma.CustomerStashFindFirstArgs, "where" | "select"> {}

export default resolver.pipe(
  resolver.zod(GetStash),
  resolver.authorize(),
  async ({ id, stashType }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    switch (stashType) {
      case "Customer":
        let stash = await db.customerStash.findFirst({
          where: { id },
        })
        break
      // case "Location":
      //   const stash = await db.locationStash.findFirst({
      //     where: { id },
      //   })
      //   break
      // case "Job":
      //   const stash = await db.jobStash.findFirst({
      //     where: { id },
      //   })
      //   break
      case "Customer":
        stash = await db.customerStash.findFirst({
          where: { id },
        })
        break
      case "Customer":
        stash = await db.customerStash.findFirst({
          where: { id },
        })
        break

      default:
        break
    }

    if (!stash) return null

    return stash
  }
)
