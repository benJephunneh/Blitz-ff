import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const FindCustomer = z.object({
  query: z.string()
})

const findCustomer = resolver.pipe(
  resolver.zod(FindCustomer),

  async ({ query }) => {
    if (!query) return []

    // const search = query.split(" ").join(" | ")

    const customers = await db.customer.findMany({
      where: {
        OR: [
          { firstname: { query, mode: 'insensitive' }},
          { lastname: { query, mode: 'insensitive' }},
        ],
      },

      orderBy: [
        {
          _relevance: {
            fields: ['lastname', 'firstname'],
            search,
            sort, 'desc',
          },
        },
      ],
    })

    return customers
  }
