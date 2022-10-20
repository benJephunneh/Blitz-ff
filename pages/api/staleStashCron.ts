import { CustomerStash } from "@prisma/client"
import db from "db"
import { CronJob, Queue } from "quirrel/blitz"
import { subDays, subMinutes } from "date-fns"

// export default Queue("api/queues/deleteStaleStash", async (stash: CustomerStash) => {
//   console.log(`setting up automatic deletion of ${stash.displayname}`)
// })

export default CronJob("api/staleStashCron", "0 18 * * 2-6", async () => {
  await db.customerStash.deleteMany({
    where: {
      updatedAt: {
        // lt: subMinutes(Date.now(), 1),
        lt: subDays(Date.now(), 1),
      },
    },
  })
  await db.locationStash.deleteMany({
    where: {
      updatedAt: {
        // lt: subMinutes(Date.now(), 1),
        lt: subDays(Date.now(), 1),
      },
    },
  })
  await db.jobStash.deleteMany({
    where: {
      updatedAt: {
        // lt: subMinutes(Date.now(), 1),
        lt: subDays(Date.now(), 1),
      },
    },
  })
})
