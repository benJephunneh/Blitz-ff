import Papa, { ParseResult } from "papaparse"
import { useCallback, useEffect, useState } from "react"

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
  const [customerData, setCustomerData] = useState<CustomerModel[] | undefined>()

  const getCsv = useCallback(() => {
    Papa.parse("/testfile.csv", {
      header: true,
      download: true,
      delimiter: ",",
      complete: ({ data, errors, meta }: ParseResult<CustomerModel>) => {
        setCustomerData(data)
        console.log("Parse errors:", errors)
      },
    })
  }, [])

  useEffect(() => {
    getCsv()
  }, [getCsv])

  return customerData
}

export default useCsvParse
