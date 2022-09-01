import { resolver, useMutation } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { ArchiveLocation } from "../validations"

interface ArchiveLocationInput extends Pick<Prisma.LocationFindManyArgs, "where"> {}

// See discussion on batch operations:
//  https://github.com/prisma/prisma/issues/4998

export default resolver.pipe(
  resolver.authorize(["Admin", "Owner"]),
  async ({ where }: ArchiveLocationInput) => {
    return await db.$transaction(async (prisma) => {
      const locations = await prisma.location.findMany({ where })
      // const archiveLocations = await prisma.locationArchive.c

      // const [archiveJobsMutation] = useMutation(archiveJobs)
      // const [archiveInvoicesMutation] = useMutation(archiveInvoices)
      // const [archiveEstimatesMutation] = useMutation(archiveEstimates)

      // Get customer to be archived:
      if (!locations) throw new NotFoundError(`Customer ${where} not found.`)

      // Archive the independent models, first:
      // await new Promise((resolve) => {
      //   resolve(archiveJobsMutation)
      // }).then(async () => {
      //   await new Promise((resolve) => {
      //     resolve(archiveInvoicesMutation)
      //   }).then(async () => {
      //     await new Promise((resolve) => {
      //       resolve(archiveEstimatesMutation)
      //     })
      //   })
      // })

      // Create archival copy:
    })
  }
)
