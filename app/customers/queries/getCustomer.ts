import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { z } from "zod"

const GetCustomer = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
  id: z.number(),
})

interface CustomerFindFirstArgs
  extends Pick<Prisma.CustomerFindFirstArgs, "where" | "include" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),
  // resolver.zod(GetCustomer),

  // async ({ id }) => {
  async ({ where }: CustomerFindFirstArgs) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    // if (!id) return null

    const customer = await db.customer.findFirst({
      where,
      // include: {
      //   locations: {
      //     select: { id: true },
      //     orderBy: { primary: "desc" },
      //   },
      // },
      // include: {
      //   locations: {
      //     where,
      //   },
      // },
      // select: {
      //   id: true,
      //   firstname: true,
      //   lastname: true,
      //   companyname: true,
      //   displayname: true,
      //   email: true,
      // },
    })
    // const locations = customer ? customer["locations"] : []
    // const locationCount = await db.location.count({
    //   where: { customerId: customer?.id },
    // })

    // if (!customer) throw new NotFoundError()

    return customer
  }
)
