import { paginate, PromiseReturnType } from "blitz"
import { resolver, useQuery } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import router, { useRouter } from "next/router"
import { HStack, IconButton, MenuList, Tag, TagLabel } from "@chakra-ui/react"
import getLocation from "./getLocation"
import { FcGlobe } from "react-icons/fc"
import createLocation from "../mutations/createLocation"

interface GetLocationsInput
  extends Pick<Prisma.LocationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

const getLocations = resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetLocationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: locations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.location.count({ where }),
      query: (paginateArgs) => db.location.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      locations,
      nextPage,
      hasMore,
      count,
    }
  }
)

export default getLocations
