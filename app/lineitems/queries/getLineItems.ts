import { resolver } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import db from "db"

interface GetLineItemsArgs extends Pick<Prisma.LineItemFindFirstArgs, "where" | "orderBy"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, orderBy }: GetLineItemsArgs) => {
    const lineitems = await db.lineItem.findMany({ where, orderBy })

    return lineitems
  }
)
