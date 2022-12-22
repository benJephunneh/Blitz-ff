import { resolver } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import db from "db"

interface LineItemFindFirstArgs
  extends Pick<Prisma.LineItemFindFirstArgs, "where" | "include" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, select }: LineItemFindFirstArgs) => {
    const lineItem = await db.lineItem.findFirst({
      where,
      select,
    })

    return lineItem
  }
)
