import { z } from "zod"
import jsonSchema from "./jsonSchema"

const stashContentSchema = z.object({
  type: z.string(),
  body: z.array(jsonSchema),
})

export default stashContentSchema
