import { resolver } from "@blitzjs/rpc"
import db from "db"
// import { Op, or, Sequelize } from "sequelize/types"
import { z } from "zod"

const FindCustomer = z.object({
  query: z.string(),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FindCustomer),

  async ({ query }) => {
    if (!query) return []

    const searchOr = query.trim().split(" ").join(" | ")
    const searchAnd = query.split(" ").join(" & ")

    console.log({ searchAnd })

    const customers = await db.customer.findMany({
      where: {
        OR: [
          { firstname: { contains: searchAnd, mode: "insensitive" } },
          // { firstname: { contains: searchOr, mode: "insensitive" } },
          { firstname: { search: searchAnd, mode: "insensitive" } },
          // { firstname: { search: searchOr, mode: "insensitive" } },
          { lastname: { contains: searchAnd, mode: "insensitive" } },
          // { lastname: { contains: searchOr, mode: "insensitive" } },
          { lastname: { search: searchAnd, mode: "insensitive" } },
          // { lastname: { search: searchOr, mode: "insensitive" } },
          { companyname: { contains: searchAnd, mode: "insensitive" } },
          // { companyname: { contains: searchOr, mode: "insensitive" } },
          { companyname: { search: searchAnd, mode: "insensitive" } },
          // { companyname: { search: searchOr, mode: "insensitive" } },
          { email: { contains: searchAnd, mode: "insensitive" } },
          // { email: { contains: searchOr, mode: "insensitive" } },
          { email: { search: searchAnd, mode: "insensitive" } },
          // { email: { search: searchOr, mode: "insensitive" } },
          { notes: { contains: searchAnd, mode: "insensitive" } },
          // { notes: { contains: searchOr, mode: "insensitive" } },
          { notes: { search: searchAnd, mode: "insensitive" } },
          // { notes: { search: searchOr, mode: "insensitive" } },
        ],
      },
    })

    return customers
  }
)
