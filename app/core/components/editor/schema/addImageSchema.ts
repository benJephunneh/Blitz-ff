import { z } from "zod"
import requiredStringSchema from "./requiredStringSchema"

const addImageSchema = z.object({
  image: requiredStringSchema(),
})

export default addImageSchema
