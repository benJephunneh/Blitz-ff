import { StashType } from "@prisma/client"
import stashContentSchema from "app/core/components/editor/schema/stashContentSchema"
import { CreateCustomerStash, CustomerSkeleton } from "app/customers/validations"
import { CreateJobStash } from "app/jobs/validations"
import { CreateLocationStash, LocationSkeleton } from "app/locations/validations"
import { z } from "zod"

export const customer = CreateCustomerStash
export const location = CreateLocationStash
export const job = CreateJobStash
// export const estimate = CreateEstimateStash
// export const invoice = CreateInvoiceStash

const id = z.number()
const customerId = z.number()
const locationId = z.number()
const jobId = z.number()
const estimateId = z.number()
const invoiceId = z.number()

const stashType = z.nativeEnum(StashType)
const textNotes = z.string()
const notes = stashContentSchema

export const CreateStash = z.object({
  stashType,
  // customerId: customerId.optional(),
  customer: customer.optional(),
  // locationId: locationId.optional(),
  location: location.optional(),
  // jobId: jobId.optional(),
  job: job.optional(),
  // estimateId: estimateId.optional(),
  // estimate: estimateId.partial().optional(),
  // invoiceId: invoiceId.optional(),
  // invoice: invoiceId.partial().optional(),
  // notes: textNotes, // Since this is in each other stash (e.g. in CreateCustomerStash), do I need this?
})

export const UpdateStash = CreateStash.extend({ id })
