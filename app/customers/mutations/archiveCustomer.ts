import { resolver, useMutation } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { ArchiveCustomer } from "../validations"

interface ArchiveCustomerInput extends Pick<Prisma.CustomerFindFirstArgs, "where"> {}

export default resolver.pipe(
  resolver.authorize(["Admin", "Owner"]),
  async ({ where }: ArchiveCustomerInput) => {
    // const [archiveLocationsMutation] = useMutation(archiveLocations)

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
