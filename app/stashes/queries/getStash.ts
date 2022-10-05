import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { LocationStash, Prisma, StashType } from "db"
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
    let stash
    switch (stashType) {
      case "Customer":
        stash = await db.customerStash.findFirst({
          where: { id },
        })

        break
      case "Location":
        stash = await db.locationStash.findFirst({
          where: { id },
        })
        break
      // case "Job":
      //   const stash = await db.jobStash.findFirst({
      //     where: { id },
      //   })
      //   break
      // case "Invoice":
      //   stash = await db.invoiceStash.findFirst({
      //     where: { id },
      //   })
      //   break
      // case "Estimate":
      //   stash = await db.estimateStash.findFirst({
      //     where: { id },
      //   })
      //   break

      default:
        break
    }

    // if (!stash) throw new NotFoundError()

    // const user = await db.user.findFirst({
    //   where: { id },
    //   select: { id: true, username: true, email: true, role: true },
    // })

    // if (!user) throw new NotFoundError()

    // return {
    //   stash,
    //   user,
    // }
    return stash
  }
)
