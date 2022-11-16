import { BlitzPage } from "@blitzjs/next"
import * as fs from "fs"

const CsvPage: BlitzPage = () => {
  // See https://dev.to/mahdi_falamarzi/how-to-read-csv-file-in-typescript-react-app-106h
  const fn = "testfile.csv"
  fs.readFile(fn, (e, d) => {
    console.log(d)
  })

  return (
    <div>
      <p>See console for log.</p>
    </div>
  )
}

export default CsvPage
