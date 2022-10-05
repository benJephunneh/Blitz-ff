import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetCustomerStashesInput
  extends Pick<Prisma.CustomerStashFindManyArgs, "where" | "orderBy"> {}
// interface GetLocationStashesInput extends Pick<Prisma.LocationStashFindManyArgs, "where" | "orderBy"> {}
// interface GetJobStashesInput extends Pick<Prisma.JobStashFindManyArgs, "where" | "orderBy"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy }: GetCustomerStashesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let count = await db.customerStash.count()
    const customerStashes = await db.customerStash.findMany()

    count += await db.locationStash.count()
    const locationStashes = await db.locationStash.findMany()

    // count += await db.jobStash.count()
    // const jobStashes = await db.jobStash.findMany({ where, orderBy })

    return {
      customerStashes,
      locationStashes,
      count,
    }
  }
)
