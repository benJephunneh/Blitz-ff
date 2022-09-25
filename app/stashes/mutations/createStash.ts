import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import stashContentSchema from "../schema/stashContentSchema"

const CreateStash = z.object({
  id: z.number(), // This is ID of page that created the stash (i.e. customer page 1, or job page 12, etc.).
  body: stashContentSchema.nullable(),
  type: z.enum(["Customer", "Location", "Job", "Invoice", "Estimate"]),
})

export default resolver.pipe(
  resolver.zod(CreateStash),
  resolver.authorize(),

  async ({ id, body, type }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    let stash
    switch (type) {
      case "Customer":
        stash = await db.stash.create({
          data: {
            userId: ctx.session.userId,
            customerId: id,
            type,
            body: JSON.stringify(body),
          },
        })
        // Create Quirrel queue
        break
      case "Location":
        stash = await db.stash.create({
          data: {
            userId: ctx.session.userId,
            locationId: id,
            type,
            body: JSON.stringify(body),
          },
        })
        // Create Quirrel queue
        break
      case "Job":
        stash = await db.stash.create({
          data: {
            userId: ctx.session.userId,
            jobId: id,
            type,
            body: JSON.stringify(body),
          },
        })
        // Create Quirrel queue
        break
      // case "Invoice":
      //   stash = await db.stash.create({
      //     data: {
      //       userId: ctx.session.userId,
      //       invoiceId: id,
      //       type,
      //       body: JSON.stringify(body),
      //     },
      //   })
      //   // Create Quirrel queue
      //   break
      // case "Estimate":
      //   stash = await db.stash.create({
      //     data: {
      //       userId: ctx.session.userId,
      //       estimateId: id,
      //       type,
      //       body: JSON.stringify(body),
      //     },
      //   })
      //   // Create Quirrel queue
      //   break

      default:
        break
    }

    return stash
  }
)
