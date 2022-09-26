import { resolver } from "@blitzjs/rpc"
import { CreateCustomer } from "app/customers/validations"
import { CreateJob } from "app/jobs/validations"
import { CreateLocation } from "app/locations/validations"
import { NotFoundError } from "blitz"
import db, { StashType } from "db"
import { z } from "zod"
import stashContentSchema from "../schema/stashContentSchema"

const customerZod = CreateCustomer
const locationZod = CreateLocation
const jobZod = CreateJob

const UpdateStash = z.object({
  id: z.number(),
  body: stashContentSchema.nullable(),
  type: z.nativeEnum(StashType),
  customer: customerZod.partial(),
  location: locationZod.partial(),
  job: jobZod.partial(),
})

export default resolver.pipe(
  resolver.zod(UpdateStash),
  resolver.authorize(),

  async ({ id, body, type, customer, location, job }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const oldStash = await db.stash.findUnique({ where: { id } })
    if (!oldStash) return new NotFoundError()

    // Take stash type to update other model:
    switch (oldStash.type) {
      case "Customer":
        await db.customerStash.update({
          where: { id },
          data: {
            ...customer,
          },
        })
        break
      case "Location":
        await db.locationStash.update({
          where: { id },
          data: {
            ...location,
          },
        })
        break
      case "Job":
        await db.jobStash.update({
          where: { id },
          data: {
            ...job,
          },
        })
        break
      // case "Invoice":
      //   await db.invoiceStash.update({
      //     where: { id },
      //     data: {
      //       ...invoice,
      //     },
      //   })
      //   break
      // case "Estimate":
      //   await db.estimateStash.update({
      //     where: { id },
      //     data: {
      //       ...estimate,
      //     },
      //   })
      //   break

      default:
        break
    }

    const stash = await db.stash.update({
      where: { id },
      data: {
        userId: ctx.session.userId,
        body: JSON.stringify(body),
        type,
      },
    })

    return stash
  }
)
