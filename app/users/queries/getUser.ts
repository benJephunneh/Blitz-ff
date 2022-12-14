import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { z } from "zod"

const GetUser = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})
interface GetUserProps extends Pick<Prisma.UserFindFirstArgs, "where" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(GetUser),

  async ({ id }) => {
    const user = await db.user.findFirst({
      where: { id },
      select: { id: true, username: true, email: true, role: true },
    })

    // if (!user) throw new NotFoundError()

    return user
  }
)
