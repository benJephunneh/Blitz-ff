import { resolver, useMutation } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { ArchiveLocation } from "../validations"

interface ArchiveLocationInput extends Pick<Prisma.LocationFindManyArgs, "where"> {}

export default resolver.pipe(
  resolver.authorize(["Admin", "Owner"]),
  async ({ where }: ArchiveLocationInput) => {
    // Get customer to be archived:
    const locations = await db.location.findMany({ where })
    if (!locations) throw new NotFoundError(`Customer ${where} not found.`)

    await new Promise((resolve) => {
      resolve(archiveJobsMutation)
    }).then(async () => {
      await new Promise((resolve) => {
        resolve(archiveInvoicesMutation)
      }).then(async () => {
        await new Promise((resolve) => {
          resolve(archiveEstimatesMutation)
        })
      })
    })

    // Create archival copy:
    await db.customer.create({
      data: {
        ...customer,
      },
    })
  }
)
