import { readFileSync } from "fs"
import { parse } from "papaparse"
import { ParseResult } from "zod"

const file = readFileSync("testfile.csv", "utf8")
parse(file, {
  header: true,
  skipEmptyLines: true,
  delimiter: ",",
  complete: (res) => console.dir(res.data),
})
