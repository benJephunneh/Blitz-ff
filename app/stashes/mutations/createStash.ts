import { generateToken, hash256 } from "@blitzjs/auth"
import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import customerContext from "app/customers/contexts/customerContext"
import { id } from "app/jobs/validations"
import db from "db"
import { z } from "zod"
import stashBodySchema from "../schemas/stashBodySchema"

const CreateStash = z.object({
  id: z.number(), // id of type of stash (e.g. from customer page, job page, etc.)
  body: stashBodySchema.nullable(),
  stashType: z.enum(["Customer", "Location", "Job", "Invoice", "Estimate"]),
  // expiresAt:
})

const STASH_EXPIRATION_IN_HOURS = 32

export default resolver.pipe(
  resolver.zod(CreateStash),
  resolver.authorize(),

  async ({ id, body, stashType }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const token = generateToken()
    const hashedToken = hash256(token)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + STASH_EXPIRATION_IN_HOURS)

    const userId = ctx.session.userId

    let stash
    switch (stashType) {
      case "Customer":
        stash = await db.stash.create({
          data: {
            body: JSON.stringify(body),
            customerId: id,
            userId,
          },
          select: {
            id: true,
          },
        })
        break
      case "Location":
        stash = await db.stash.create({
          data: {
            body: JSON.stringify(body),
            locationId: id,
            userId,
          },
          select: {
            id: true,
          },
        })
        break
      case "Job":
        stash = await db.stash.create({
          data: {
            body: JSON.stringify(body),
            jobId: id,
            userId,
          },
          select: {
            id: true,
          },
        })
        break
      // case "Invoice":
      //   stash = await db.stash.create({
      //     data: {
      //       body: JSON.stringify(body),
      //       invoiceId: id,
      // userId,
      //     },
      //     select: {
      //       id: true,
      //     },
      //   })
      //   break
      // case "Estimate":
      //   stash = await db.stash.create({
      //     data: {
      //       body: JSON.stringify(body),
      //       estimateId: id,
      // userId,
      //     },
      //     select: {
      //       id: true,
      //     },
      //   })
      //   break

      default:
        break
    }

    await db.token.create({
      data: {
        type: "STASH_EXPIRATION",
        stashId: stash.id,
        expiresAt,
        hashedToken,
        userId,
      },
    })

    return stash
  }
)
