import * as fs from "fs"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */

export default async function readCsv(filename: string) {
  fs.readFile(filename, (e, d) => console.log(d))
}

export const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
}
