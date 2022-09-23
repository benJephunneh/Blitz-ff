import { z } from "zod"
import jsonSchema from "./jsonSchema"

const stashBodySchema = z.object({
  type: z.string(),
  body: z.array(jsonSchema),
})

export default stashBodySchema
