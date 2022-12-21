import { useMutation } from "@blitzjs/rpc"
import { keyframes } from "@emotion/react"
import updateLocate from "../mutations/updateLocate"

const LocateMenu = () => {
  const [updateLocateMutation] = useMutation(updateLocate)

  // const locateKeyframes = keyframes`
  //   from { background-color: ${useColorModeValue("red", "cyan")}; color: ${useColorModeValue(
  //   "white",
  //   "black"
  // )} }
  //     to { background-color: ${useColorModeValue("white", "#4a5568")}; color: ${useColorModeValue(
  //   "red",
  //   "cyan"
  // )} }`
  // const locateAnimation = `${locateKeyframes} 1s alternate infinite`

  return <></>
}

export default LocateMenu
