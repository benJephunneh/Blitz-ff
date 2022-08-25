import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateLocation = z.object({
  name: z.string(),
  customerId: z.number(),
});

export default resolver.pipe(
  resolver.zod(CreateLocation),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.create({ data: input });

    return location;
  }
);
