import { resolver } from "@blitzjs/rpc"
import { CustomerSkeleton } from "app/customers/validations"
import { JobSkeleton } from "app/jobs/validations"
import { LocationSkeleton } from "app/locations/validations"
import db, { StashType } from "db"
import { z } from "zod"
import stashContentSchema from "../../core/components/editor/schema/stashContentSchema"
import { CreateStash } from "../validations"

// const customerZod = CreateCustomer.partial()
// const locationZod = CreateLocation.partial()
// const jobZod = CreateJob.partial()
// const customerZod = CreateCustomerSkeleton.partial()
// const locationZod = CreateLocationSkeleton.partial()
// const jobZod = CreateJobSkeleton.partial()

// export const CreateStash = z.object({
//   notes: stashContentSchema, // .nullable(),
//   stashType: z.nativeEnum(StashType),
//   customerId: z.number().optional(),
//   locationId: z.number().optional(),
//   customer: CustomerSkeleton.partial().optional(),
//   location: LocationSkeleton.partial().optional(),
//   job: JobSkeleton.partial().optional(),
// })

// type CreateStashProps = {
//   input: any
//   stashType: StashType
// }

export default resolver.pipe(
  resolver.zod(CreateStash),
  resolver.authorize(),

  async ({ stashType, customer, location, job }, ctx) => {
    // async ({ input, stashType }: CreateStashProps, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // console.log(`customer input to createStash: ${JSON.stringify(customer)}`)

    let stash
    switch (stashType) {
      case "Customer":
        let displayname
        if (customer!.firstname) {
          displayname = customer!.firstname
          if (customer!.lastname) displayname += ` ${customer!.lastname}`
        } else if (customer!.lastname) displayname = customer!.lastname
        else if (customer!.companyname) displayname = customer!.companyname

        stash = await db.customerStash.create({
          data: {
            displayname,
            stashType,
            // notes,
            // notes: JSON.stringify(notes),
            userId: ctx.session.userId,
            ...customer!,
          },
        })

        break
      case "Location":
        stash = await db.locationStash.create({
          data: {
            // customerId: customerId!,
            stashType,
            // notes,
            // notes: JSON.stringify(notes),
            userId: ctx.session.userId,
            ...location!,
          },
        })

        break
      case "Job":
        const { lineitems, ...jobVals } = job!
        const lineitemIds: { id: number }[] = [...(lineitems?.map(({ id }) => ({ id })) ?? [])]
        stash = await db.jobStash.create({
          data: {
            // customerId: customerId!,
            // locationId: locationId!,
            stashType,
            lineitems: { connect: [...lineitemIds] },
            // start: start ? new Date(start) : null,
            // end: end ? new Date(end) : null,
            // notes,
            // notes: JSON.stringify(notes),
            userId: ctx.session.userId,
            ...jobVals,
          },
        })

        break
      // case "Invoice":
      //   stash = await db.stash.create({
      //     data: {
      //       userId: ctx.session.userId,
      //       invoiceId: id,
      //       stashType,
      //       notes: JSON.stringify(notes),
      //     },
      //   })

      // type s = zz.infer<typeof stash>
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

      // type s = zz.infer<typeof stash>
      //   // Create Quirrel queue
      //   break

      default:
        break
    }

    return stash
  }
)
