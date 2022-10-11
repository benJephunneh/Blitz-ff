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
        ],
      },
    })
    const locations = await db.location.findMany({
      where: {
        OR: [
          { house: { contains: search } },
          { house: { search } },
          { street: { contains: search, mode: "insensitive" } },
          { street: { search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
          { city: { search, mode: "insensitive" } },
          { state: { contains: search, mode: "insensitive" } },
          { state: { search, mode: "insensitive" } },
          { zipcode: { contains: search } },
          { zipcode: { search } },
          { phones: { contains: search } },
          { phones: { search } },
          { block: { contains: search, mode: "insensitive" } },
          { block: { search, mode: "insensitive" } },
          { lot: { contains: search } },
          { lot: { search } },
          { parcel: { contains: search, mode: "insensitive" } },
          { parcel: { search, mode: "insensitive" } },
        ],
      },
    })

    const results = [...customers, ...locations]
    return results

    // return {
    //   customers,
    //   locations,
    // }
    // return customers
  }
)
