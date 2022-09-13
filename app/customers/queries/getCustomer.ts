import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCustomer = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
  id: z.number(),
})

type GetCustomerProps = {
  id?: number
}

export default async function getCustomer({ id }: GetCustomerProps) {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  if (!id) return null

  const customer = await db.customer.findFirst({
    where: { id },
    select: { id: true, firstname: true, lastname: true, email: true, phone: true },
  })

  if (!customer) throw new NotFoundError(`CustomerId ${id} not found.`)

  return customer
}
