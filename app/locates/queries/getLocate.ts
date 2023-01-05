import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface LocateFindFirstArgs
  extends Pick<Prisma.LocateFindFirstArgs, "where" | "include" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, select }: LocateFindFirstArgs) => {
    const locate = await db.locate.findFirst({
      where,
      select,
    })

    return locate
  }
)
