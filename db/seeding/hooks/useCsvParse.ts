import Papa, { ParseResult } from "papaparse"
import { useEffect, useState } from "react"

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

const useCsvParse = () => {
  const [customerData, setCustomerData] = useState<CustomerData | undefined>()

  const getCsv = () => {
    Papa.parse("public/testfile.csv", {
      header: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (res: ParseResult<CustomerModel>) => {
        setCustomerData(res)
      },
    })
  }

  useEffect(() => {
    getCsv()
  }, [])

  return customerData
}

export default useCsvParse
