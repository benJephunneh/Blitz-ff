import { resolver } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import db from "db"

interface GetLineItemsArgs extends Pick<Prisma.LineItemFindManyArgs, "where" | "orderBy"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, orderBy }: GetLineItemsArgs) => {
    return await db.lineItem.findMany({
      where,
      orderBy,
    })
  }
)
