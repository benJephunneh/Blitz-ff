import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const FindLocation = z.object({
  query: z.string(),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FindLocation),

  async ({ query }) => {
    if (!query) return []

    const search = query.split(" ").join(" | ")

    const locations = await db.location.findMany({
      where: {
        OR: [
          { house: { contains: search, mode: "insensitive" } },
          { house: { search, mode: "insensitive" } },
          { street: { contains: search, mode: "insensitive" } },
          { street: { search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
          { city: { search, mode: "insensitive" } },
          { zipcode: { contains: search, mode: "insensitive" } },
          { zipcode: { search, mode: "insensitive" } },
          { block: { contains: search, mode: "insensitive" } },
          { block: { search, mode: "insensitive" } },
          { lot: { contains: search, mode: "insensitive" } },
          { lot: { search, mode: "insensitive" } },
          { parcel: { contains: search, mode: "insensitive" } },
          { parcel: { search, mode: "insensitive" } },
          { notes: { contains: search, mode: "insensitive" } },
          { notes: { search, mode: "insensitive" } },
        ],
      },
    })

    return locations
  }
)
