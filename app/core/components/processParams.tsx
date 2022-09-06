import { useQuery } from "@blitzjs/rpc"
import getCustomer from "app/customers/queries/getCustomer"
import getLocation from "app/locations/queries/getLocation"
import db from "db"
import { decode } from "punycode"

declare type Dict<T> = Record<string, T | undefined>

const decodeParam = async (k: string, v: string): Promise<any> => {
  console.log(`decodeParam k: ${k}`)
  console.log(`decodeParam v: ${v}`)
  switch (k) {
    case "customerId":
      const customer = await db.customer.findFirst({ where: { id: Number(v) } })
      return `${customer?.firstname} ${customer?.lastname}`
    case "locationId":
      const location = await db.location.findFirst({ where: { id: Number(v) } })
      return `${location?.house} ${location?.street}`

    default:
      break
  }
}

const processParams = ({ params }: any): string[] => {
  console.log(`params in processParams: ${JSON.stringify(params)}`)

  let res: string[] = []
  for (const k in params) {
    console.log(`k in for loop: ${k}`)
    decodeParam(k, params[k]!)
      .then((p) => res.push(p))
      .catch((e) => console.log(`Something wint rong with processParams: ${e}`))
  }
  return res
}

export default processParams
