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

    const searchAnd = query.trim().split(" ").join(" & ")
    const searchOr = query.trim().split(" ").join(" | ")

    const locations = await db.location.findMany({
      where: {
        OR: [
          { street: { contains: searchAnd, mode: "insensitive" } },
          { street: { contains: searchOr, mode: "insensitive" } },
          { street: { search: searchAnd, mode: "insensitive" } },
          { street: { search: searchOr, mode: "insensitive" } },
          { city: { contains: searchAnd, mode: "insensitive" } },
          { city: { contains: searchOr, mode: "insensitive" } },
          { city: { search: searchAnd, mode: "insensitive" } },
          { city: { search: searchOr, mode: "insensitive" } },
          { zipcode: { contains: searchAnd, mode: "insensitive" } },
          { zipcode: { contains: searchOr, mode: "insensitive" } },
          { zipcode: { search: searchAnd, mode: "insensitive" } },
          { zipcode: { search: searchOr, mode: "insensitive" } },
          { house: { contains: searchAnd, mode: "insensitive" } },
          { house: { contains: searchOr, mode: "insensitive" } },
          { house: { search: searchAnd, mode: "insensitive" } },
          { house: { search: searchOr, mode: "insensitive" } },
          { block: { contains: searchAnd, mode: "insensitive" } },
          { block: { contains: searchOr, mode: "insensitive" } },
          { block: { search: searchAnd, mode: "insensitive" } },
          { block: { search: searchOr, mode: "insensitive" } },
          { lot: { contains: searchAnd, mode: "insensitive" } },
          { lot: { contains: searchOr, mode: "insensitive" } },
          { lot: { search: searchAnd, mode: "insensitive" } },
          { lot: { search: searchOr, mode: "insensitive" } },
          { parcel: { contains: searchAnd, mode: "insensitive" } },
          { parcel: { contains: searchOr, mode: "insensitive" } },
          { parcel: { search: searchAnd, mode: "insensitive" } },
          { parcel: { search: searchOr, mode: "insensitive" } },
          { notes: { contains: searchAnd, mode: "insensitive" } },
          { notes: { contains: searchOr, mode: "insensitive" } },
          { notes: { search: searchAnd, mode: "insensitive" } },
          { notes: { search: searchOr, mode: "insensitive" } },
        ],
      },
    })

    return locations
  }
)
