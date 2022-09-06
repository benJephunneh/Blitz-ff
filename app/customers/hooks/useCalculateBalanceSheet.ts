import { Location } from "@prisma/client"
import { useMemo } from "react"
import calculateBalance from "../helpers/calculateBalance"

const useCalculateBalanceSheet = (locations: Location[]) => {
  return useMemo(() => {
    return calculateBalance(locations)
  }, [locations])
}

export default useCalculateBalanceSheet
