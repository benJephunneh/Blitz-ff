import { resolver } from "@blitzjs/rpc"
import { CreateCustomer } from "app/customers/validations"
import { CreateJob } from "app/jobs/validations"
import { CreateLocation } from "app/locations/validations"
import { NotFoundError } from "blitz"
import db, { StashType } from "db"
import { z } from "zod"
import stashContentSchema from "../../core/components/editor/schema/stashContentSchema"

const customerZod = CreateCustomer
const locationZod = CreateLocation
const jobZod = CreateJob

export const UpdateStash = z.object({
  id: z.number(),
  notes: stashContentSchema.nullable(),
  stashType: z.nativeEnum(StashType),
  customer: customerZod.partial().optional(),
  location: locationZod.partial().optional(),
  job: jobZod.partial().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateStash),
  resolver.authorize(),

  async ({ id, notes, stashType, customer, location, job }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    console.log(JSON.stringify(customer))

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

        // console.log(JSON.stringify(customer))

        stash = await db.customerStash.update({
          where: { id },
          data: {
            userId: ctx.session.userId,
            notes: JSON.stringify(notes),
            stashType,
            firstname: customer?.firstname,
            lastname: customer?.lastname,
            companyname: customer?.companyname,
            displayname,
            email: customer?.email,
          },
        })
        break
      // case "Location":
      //   await db.locationStash.update({
      //     where: { id },
      //     data: {
      //       userId: ctx.session.userId,
      //       notes: JSON.stringify(notes),
      //       stashType,
      //       ...location,
      //     },
      //   })
      //   break
      // case "Job":
      //   await db.jobStash.update({
      //     where: { id },
      //     data: {
      //       userId: ctx.session.userId,
      //       notes: JSON.stringify(notes),
      //       stashType,
      //       ...job,
      //     },
      //   })
      //   break
      // case "Invoice":
      //   await db.invoiceStash.update({
      //     where: { id },
      //     data: {
      //       userId: ctx.session.userId,
      //       notes: JSON.stringify(notes),
      //       stashType,
      //       ...invoice,
      //     },
      //   })
      //   break
      // case "Estimate":
      //   await db.estimateStash.update({
      //     where: { id },
      //     data: {
      //       userId: ctx.session.userId,
      //       notes: JSON.stringify(notes),
      //       stashType,
      //       ...estimate,
      //     },
      //   })
      //   break

      default:
        break
    }

    return stash
  }
)
