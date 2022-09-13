import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const FindCustomer = z.object({
  query: z.string(),
})

const findCustomer = resolver.pipe(
  resolver.zod(FindCustomer),

  async ({ query }) => {
    if (!query) return []

    const search = query.split(" ").join(" | ")

    const customers = await db.customer.findMany({
      where: {
        OR: [
          { firstname: { search: query } },
          { lastname: { search: query } },
          { email: { search: query } },
          { phone: { search: query } },
        ],
      },
    })

    return customers
  }
)
