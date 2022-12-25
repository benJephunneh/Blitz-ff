import { resolver } from "@blitzjs/rpc"
import { CustomerSkeleton } from "app/customers/validations"
import { LocationSkeleton } from "app/locations/validations"
import { isJobWithLineitems, JobSkeleton, jobStashType, JobType } from "app/jobs/validations"
import db, { Job, LineItem, StashType } from "db"
import { z } from "zod"
import { UpdateStash } from "../validations"

// const customerZod = CreateCustomer
// const locationZod = CreateLocation
// const jobZod = CreateJob

// export const UpdateStash = z.object({
//   id: z.number(),
//   notes: stashContentSchema.nullable(),
//   stashType: z.nativeEnum(StashType),
//   // customerId: z.number().optional(),
//   customer: CustomerSkeleton.partial().optional(),
//   location: LocationSkeleton.partial().optional(),
//   job: JobSkeleton.partial().optional(),
// })

export default resolver.pipe(
  resolver.zod(UpdateStash),
  resolver.authorize(),

  async ({ id, stashType, customer, location, job }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // console.log(JSON.stringify(customer))

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
            displayname,
            stashType,
            // firstname: customer?.firstname,
            // lastname: customer?.lastname,
            // companyname: customer?.companyname,
            // displayname,
            // email: customer?.email,
            // notes: JSON.stringify(notes),
            userId: ctx.session.userId,
            ...customer,
          },
        })
        break
      case "Location":
        stash = await db.locationStash.update({
          where: { id },
          data: {
            stashType,
            // notes: JSON.stringify(notes),
            userId: ctx.session.userId,
            ...location,
          },
        })
        break
      case "Job":
        const { lineitems, userId, ...jobVals } = job as jobStashType
        const lineitemIds = [...lineitems.map(({ id }) => ({ id }))]

        await db.jobStash.update({
          where: { id },
          data: {
            lineitems: { connect: [...lineitemIds] },
            // stashType,
            // notes: JSON.stringify(notes),
            userId: ctx.session.userId,
            ...jobVals,
          },
        })
        break
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
