import { resolver } from "@blitzjs/rpc"
import { CreateCustomer } from "app/customers/validations"
import { CreateJob } from "app/jobs/validations"
import { CreateLocation } from "app/locations/validations"
import db, { StashType } from "db"
import { z } from "zod"
import stashContentSchema from "../../core/components/editor/schema/stashContentSchema"

const customerZod = CreateCustomer
const locationZod = CreateLocation
const jobZod = CreateJob

export const CreateStash = z.object({
  // id: z.number(), // This is ID of page that created the stash (i.e. customer page 1, or job page 12, etc.).
  body: stashContentSchema.nullable(),
  customerId: z.number().optional(),
  locationId: z.number().optional(),
  jobId: z.number().optional(),
  type: z.nativeEnum(StashType),
  // customer: customerZod.partial(),
  // location: locationZod.partial(),
  // job: jobZod.partial(),
})

export default resolver.pipe(
  resolver.zod(CreateStash),
  resolver.authorize(),

  async ({ customerId, locationId, jobId, body, type }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    let stash
    switch (type) {
      case "Customer":
        stash = await db.stash.create({
          data: {
            userId: ctx.session.userId,
            customerId,
            type,
            body: JSON.stringify(body),
          },
        })
        // await db.customerStash.create({
        //   data: {
        //     stashId: stash.id,
        //     ...customer,
        //   },
        // })
        // Create Quirrel queue
        break
      case "Location":
        stash = await db.stash.create({
          data: {
            userId: ctx.session.userId,
            locationId,
            type,
            body: JSON.stringify(body),
          },
        })
        // await db.locationStash.create({
        //   data: {
        //     customerId: location.customerId!,
        //     stashId: stash.id,
        //     ...location,
        //   },
        // })
        // Create Quirrel queue
        break
      case "Job":
        stash = await db.stash.create({
          data: {
            userId: ctx.session.userId,
            jobId,
            type,
            body: JSON.stringify(body),
          },
        })
        // await db.jobStash.create({
        //   data: {
        //     locationId: job.locationId!,
        //     stashId: stash.id,
        //     ...job,
        //   },
        // })
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
