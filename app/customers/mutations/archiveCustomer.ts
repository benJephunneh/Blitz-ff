import { resolver, useMutation } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { ArchiveCustomer } from "../validations"

export default resolver.pipe(
  resolver.zod(ArchiveCustomer),
  resolver.authorize(["Admin", "Owner"]),
  async ({ id }) => {
    const [archiveLocationsMutation] = useMutation(archiveLocations)
    const [archiveJobsMutation] = useMutation(archiveJobs)
    const [archiveInvoicesMutation] = useMutation(archiveInvoices)
    const [archiveEstimatesMutation] = useMutation(archiveEstimates)

    // Get customer to be archived:
    const customer = await db.customer.findFirst({ where })
    if (!customer) throw new NotFoundError(`Customer ${where} not found.`)

    // Limit archiving mutation to only those models that are connected (e.g. Customers are parent to only Locations):
    await new Promise((resolve) => {
      resolve(archiveLocationsMutation)
    })

    // Create archival copy:
    await db.customer.create({
      data: {
        ...customer,
      },
    })
  }
)
