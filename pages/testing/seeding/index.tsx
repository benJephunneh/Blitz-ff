import { BlitzPage } from "@blitzjs/next"
// import useCsvParse from "db/seeding/hooks/useCsvParse"
// import * as fs from "fs"

const CsvPage: BlitzPage = () => {
  // See https://dev.to/mahdi_falamarzi/how-to-read-csv-file-in-typescript-react-app-106h
  // const fn = "testfile.csv"
  // fs.readFile(fn, (e, d) => {
  //   console.log(d)
  // })

  // const customerData = useCsvParse()
  // console.table({ ...customerData })

  return (
    <div>
      <p>See console for log.</p>
      {/* <pre>{JSON.stringify(customerData, null, 2)}</pre> */}
    </div>
  )
}

export default CsvPage
