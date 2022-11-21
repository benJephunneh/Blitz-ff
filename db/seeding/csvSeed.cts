// import { parse, ParseResult } from "papaparse"
import { Location, LocationType, PrismaClient } from "@prisma/client"
import { parse, ParseResult } from "papaparse"
import fs from "fs"
import { customer } from "app/stashes/validations"

type LocationModel = {
  primary: boolean
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
  locations: LocationModel[]
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

      for (const item of data) {
        const { locations, ...customer } = item
        const locs = JSON.parse(locations)
        console.log({ ...item })
        let displayname = ""
        if (item.firstname) {
          displayname = item.firstname
          if (item.lastname) displayname += " " + item.lastname
        } else if (item.lastname) displayname = item.lastname
        else displayname = item.companyname
        // console.table({ ...item })
        console.log({ displayname })

        const c = await prisma.customer.create({
          // where: { email: data[ii]!.email },
          // update: {},
          // create: {
          data: {
            displayname,
            userId: 1,
            ...customer,
          },
        })

        await prisma.customerArchive.create({
          // where: { email: data[ii]!.email },
          // update: {},
          // create: {
          data: {
            displayname,
            ...customer,
          },
        })

        // console.log("displayname", displayname)

        locations.forEach(async (l) => {
          const { primary, house, street, city, state, zipcode, block, lot, parcel, notes } = l
          const locationType: LocationType = locations.length > 1 ? "Managed" : "Personal"
          await prisma.location.create({
            data: {
              phones: c.phone,
              locationType,
              customerId: c.id,
              userId: 1,
              ...l,
              // primary,
              // house,
              // street,
              // city,
              // state,
              // zipcode,
              // block,
              // lot,
              // parcel,
              // notes,
              // phones: c.phone,
              // customerId: c.id,
              // userId: 1,
            },
          })

          await prisma.locationArchive.create({
            data: {
              phones: c.phone,
              locationType,
              customerId: c.id,
              ...l,
            },
          })
        })
      }

      console.log("Finished seeding.")
      console.error(errors)
    },
  })
}

csvSeed().catch(console.error)
// export default csvParse
