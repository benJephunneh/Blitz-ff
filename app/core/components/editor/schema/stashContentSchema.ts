import { z } from "zod"
import jsonSchema from "./jsonSchema"

const stashContentSchema = z.object({
  type: z.string(),
  content: z.array(jsonSchema),
})

export default stashContentSchema
