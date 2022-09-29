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
  notes: stashContentSchema.nullable(),
  stashType: z.nativeEnum(StashType),
  customer: customerZod.partial().optional(),
  location: locationZod.partial().optional(),
  job: jobZod.partial().optional(),
})

export default resolver.pipe(
  resolver.zod(CreateStash),
  resolver.authorize(),

  async ({ notes, stashType, customer, location, job }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    let stash
    switch (stashType) {
      case "Customer":
        let displayname = ""
        if (customer?.firstname) {
          if (customer?.lastname) {
            displayname = `${customer.firstname} ${customer.lastname}`
          } else {
            displayname = customer.firstname
          }
        } else if (customer?.companyname) {
          displayname = customer.companyname
        }

        stash = await db.customerStash.create({
          data: {
            userId: ctx.session.userId,
            notes: JSON.stringify(notes),
            stashType,
            ...customer,
          },
        })
        // Create Quirrel queue
        break
      // case "Location":
      //   stash = await db.locationStash.create({
      //     data: {
      //       userId: ctx.session.userId,
      //       notes: JSON.stringify(notes),
      //       stashType,
      //       ...location,
      //     },
      //   })
      // await db.locationStash.create({
      //   data: {
      //     customerId: location.customerId!,
      //     stashId: stash.id,
      //     ...location,
      //   },
      // })
      // Create Quirrel queue
      // break
      // case "Job":
      //   stash = await db.jobStash.create({
      //     data: {
      //       userId: ctx.session.userId,
      //       notes: JSON.stringify(notes),
      //       stashType,
      //       ...job,
      //     },
      //   })
      // await db.jobStash.create({
      //   data: {
      //     locationId: job.locationId!,
      //     stashId: stash.id,
      //     ...job,
      //   },
      // })
      // Create Quirrel queue
      // break
      // case "Invoice":
      //   stash = await db.stash.create({
      //     data: {
      //       userId: ctx.session.userId,
      //       invoiceId: id,
      //       stashType,
      //       notes: JSON.stringify(notes),
      //     },
      //   })
      //   // Create Quirrel queue
      //   break
      // case "Estimate":
      //   stash = await db.stash.create({
      //     data: {
      //       userId: ctx.session.userId,
      //       estimateId: id,
      //       stashType,
      //       notes: JSON.stringify(notes),
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
