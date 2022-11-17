import { PrismaClient } from "@prisma/client"
// import * as fs from "fs"
import csvParse from "./seeding/csvSeed.cjs"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */

// export default async function readCsv(filename: string) {
//   fs.readFile(filename, (e, d) => console.log(d))
// }

const prisma = new PrismaClient()

const seed = async () => {
  csvParse().catch(async (e) => {
    console.error(e)
    // process.exit(1)
  })
  // .finally(async () => await prisma.$disconnect())

  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
}

seed().catch(console.error)
