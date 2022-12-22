import { useQuery } from "@blitzjs/rpc"
import { CustomerStash, StashType } from "@prisma/client"
import db from "db"
import { useEffect, useState } from "react"
import getStash from "../queries/getStash"

function useStash(stashId: number | undefined, stashType: StashType) {
  // const [customerStash, setCustomerStash] = useState()
  // const [locationStash, setLocationStash] = useState<LocationStash>()

  const [stash, setStash] = useState<CustomerStash | null>()

  useEffect(() => {
    switch (stashType) {
      case "Customer":
        db.customerStash
          .findFirst({
            where: { id: stashId },
          })
          .then((s) => setStash(s))
          .catch((e) => console.log(`useStash error: ${e}`))
        break

      default:
        break
    }
  }, [stashId, stashType])

  // const stash = useQuery(
  //   getStash,
  //   {
  //     id: stashId,
  //     stashType,
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     staleTime: Infinity,
  //   }
  // )

  // setCustomerStash(stash)
  return stash
}

export default useStash
