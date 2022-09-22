import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const FindCustomer = z.object({
  query: z.string(),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FindCustomer),

  async ({ query }) => {
    if (!query) return []

    const search = query.split(" ").join(" | ")

    const customers = await db.customer.findMany({
      where: {
        OR: [
          { firstname: { contains: search, mode: "insensitive" } },
          { firstname: { search, mode: "insensitive" } },
          { lastname: { contains: search, mode: "insensitive" } },
          { lastname: { search, mode: "insensitive" } },
          { companyname: { contains: search, mode: "insensitive" } },
          { companyname: { search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { email: { search, mode: "insensitive" } },
          // { phone: { contains: search, mode: "insensitive" } },
        ],
      },
    })

    return customers
  }
)
