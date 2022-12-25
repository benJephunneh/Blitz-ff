// import { parse, ParseResult } from "papaparse"
import { PrismaClient } from "@prisma/client"
import data from "./lineitems.json"
import fs from "fs"
import { LineItem } from "@prisma/client"

type LineitemModel = {
  name: string
  cost: number
  quantity: number
  notes: string
}

type LineitemData = {
  data: LineitemModel[]
}

const prisma = new PrismaClient()
const lineitemSeed = async () => {
  await prisma.lineItem.createMany({ data })
}

lineitemSeed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
