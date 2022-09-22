import db from "db"
import { ChangeEventHandler, useCallback, useEffect, useMemo } from "react"
import debounce from "lodash/debounce"
import { useQuery } from "@blitzjs/rpc"
import findCustomer from "../queries/findCustomer"
import findEmail from "../queries/findEmail"

type CheckUniquityProps = {
  value: string
}

const checkUniquity = async ({ value }: CheckUniquityProps) => {
  // const [email] = useQuery(findEmail, { value })
  const email = "42"

  if (email == value) return false

  return true
}
