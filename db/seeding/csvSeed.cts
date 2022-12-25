// import { parse, ParseResult } from "papaparse"
import { Location, LocationType, PrismaClient } from "@prisma/client"
import { parse, ParseResult } from "papaparse"
import fs from "fs"
import { customer } from "app/stashes/validations"
import { SecurePassword } from "@blitzjs/auth"
import db from "db"

interface LocationModel {
  primary: string
  house: string
  street: string
  city: string
  state: string
  zipcode: string
  block: string
  lot: string
  parcel: string
  notes: string
}

type CustomerModel = {
  firstname: string
  lastname: string
  companyname: string
  email: string
  phone: string
  locations: string
}

type CustomerData = {
  data: CustomerModel[]
}

const file = fs.readFileSync("public/customerExports.csv", "utf8")
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
      console.log(`data length: ${data.length}`)
      // console.log(data)

      // let pw = "calebcaleb"
      // pw = await SecurePassword.hash(pw.trim())
      // const user = await prisma.user.create({
      //   data: {
      //     username: "benJephunneh",
      //     email: "caleb@email.com",
      //     hashedPassword: pw,
      //     role: "Admin",
      //   },
      //   select: {
      //     id: true,
      //     username: true,
      //     email: true,
      //     role: true,
      //   },
      // })

      for (const item of data) {
        const { locations, ...customer } = item
        let locs = locations.replaceAll(/(?<=[[{\s])'/g, '"')
        locs = locs.replaceAll(/'(?=[:,}])/g, '"')
        locs = locs.replaceAll("True", '"true"')
        locs = locs.replaceAll("False", '"false"')
        locs = locs.replaceAll("\xa0", " ")
        const parsed: LocationModel[] = JSON.parse(locs)
        console.log(parsed)
        // try {
        //   let asdf: LocationModel[] = JSON.parse(locs)
        //   // JSON.parse(locs, (k, v) => {
        //   //   if (k == "primary") {
        //   //     if (v == "True") return true
        //   //     else if (v == "False") return false
        //   //   }
        //   // })
        // } catch (e) {
        //   console.error(e.message)
        //   console.log({ locs })
        // }
        let displayname = ""
        if (item.firstname) {
          displayname = item.firstname
          if (item.lastname) displayname += " " + item.lastname
        } else if (item.lastname) displayname = item.lastname
        else displayname = item.companyname
        // console.table({ ...item })
        // console.log({ displayname })

        // const c = await prisma.customer.upsert({
        //   where: { email: item.email },
        //   update: {},
        //   create: {
        //     displayname,
        //     userId: 1,
        //     ...customer,
        //   },
        // })
        const c = await prisma.customer.create({
          data: {
            displayname,
            userId: 1,
            ...customer,
          },
        })

        await prisma.customerArchive.create({
          data: {
            displayname,
            ...customer,
          },
        })

        //   // console.log("displayname", displayname)

        parsed.forEach(async (l) => {
          const { primary, house, street, city, state, zipcode, block, lot, parcel, notes } = l
          const locationType: LocationType = locations.length > 1 ? "Managed" : "Personal"
          const location = await prisma.location.create({
            data: {
              house,
              street,
              city,
              state,
              zipcode,
              block,
              lot,
              parcel,
              primary: primary == "true" ? true : false,
              phones: c.phone,
              locationType,
              customerId: c.id,
              userId: 1,
              notes,
              // ...l,
            },
          })

          await prisma.locationArchive.create({
            data: {
              house,
              street,
              city,
              state,
              zipcode,
              block,
              lot,
              parcel,
              primary: primary == "true" ? true : false,
              phones: c.phone,
              locationType,
              customerId: c.id,
              // ...l,
            },
          })
        })
      }

      console.log("Finished seeding.")
      console.error({ errors })
    },
  })
}

csvSeed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error()
    await prisma.$disconnect()
    process.exit(1)
  })

export default csvSeed
