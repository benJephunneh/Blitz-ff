import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { z } from "zod"

const GetCustomerData = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
  id: z.number(),
})

interface CustomerFindFirstArgs
  extends Pick<Prisma.CustomerFindFirstArgs, "where" | "include" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(GetCustomerData),

  async ({ id }) => {
    const customer = await db.customer.findFirst({
      where: { id },
      include: {
        locations: {
          include: {
            jobs: {
              include: {
                lineitems: true,
              },
              orderBy: [{ start: "asc" }, { end: "asc" }, { createdAt: "asc" }],
            },
          },
          orderBy: [
            { primary: "desc" },
            { zipcode: "asc" },
            { city: "asc" },
            { street: "asc" },
            { house: "asc" },
          ],
        },
      },
    })

    return customer
  }
)
