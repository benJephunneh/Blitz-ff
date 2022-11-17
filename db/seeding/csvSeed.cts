// import { parse, ParseResult } from "papaparse"
import { PrismaClient } from "@prisma/client"
import { parse, ParseResult } from "papaparse"
import fs from "fs"

type CustomerModel = {
  firstname: string
  lastname: string
  companyname: string
  email: string
  phone: string
}

type CustomerData = {
  data: CustomerModel[]
}

const file = fs.readFileSync("public/testfile.csv", "utf8")
const prisma = new PrismaClient()
const csvSeed = async () => {
  console.log("Start csv parse...")

  parse(file, {
    header: true,
    // download: true,
    skipEmptyLines: true,
    delimiter: ",",
    complete: async ({ data, errors, meta }: ParseResult<CustomerModel>) => {
      console.log("Finished parsing.")
      console.log("Start csv seed...")
      // console.log(`data length: ${data.length}`)

      // for (let ii = 0; ii < data.length; ii++) {
      for (const item of data) {
        let displayname = ""
        if (item.firstname) {
          displayname = item.firstname
          if (item.lastname) displayname += " " + item.lastname
        } else if (item.lastname) displayname = item.lastname
        else displayname = item.companyname
        // const { firstname, lastname, companyname, email, phone } = item
        // console.table({ ...item })
        console.log({ displayname })

        await prisma.customer.create({
          // where: { email: data[ii]!.email },
          // update: {},
          // create: {
          data: {
            displayname,
            userId: 1,
            ...item,
          },
        })

        await prisma.customerArchive.create({
          // where: { email: data[ii]!.email },
          // update: {},
          // create: {
          data: {
            displayname,
            ...item,
          },
        })

        // console.log("displayname", displayname)
      }

      console.log("Finished seeding.")
      console.error(errors)
    },
  })
}

csvSeed().catch(console.error)
// export default csvParse
