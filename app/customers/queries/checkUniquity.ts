import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const EmailSchema = z.object({
  query: z.string(),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(EmailSchema),

  async ({ query }) => {
    // const [email] = useQuery(findEmail, { value })
    const res = await db.customer.findMany({
      where: {
        email: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        email: true,
      },
    })

    // if (email?.email == value) return false
    return res
  }
)
