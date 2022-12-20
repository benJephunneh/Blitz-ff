import { useMutation } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Icon,
  keyframes,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import headerContext from "app/core/components/header/headerContext"
import { useContext } from "react"
import { FcFullTrash } from "react-icons/fc"
import deleteStash from "../mutations/deleteStash"

const StashMenu = () => {
  const { customerStashes, locationStashes, jobStashes, numStashes, editStash, refetchStashes } =
    useContext(headerContext)
  const [deleteStashMutation] = useMutation(deleteStash)

  const stashKeyframes = keyframes`
    from { background-color: ${useColorModeValue("red", "cyan")}; color: ${useColorModeValue(
    "white",
    "black"
  )} }
      to { background-color: ${useColorModeValue("white", "#4a5568")}; color: ${useColorModeValue(
    "red",
    "cyan"
  )} }`
  const stashAnimation = `${stashKeyframes} 1s alternate infinite`

  return (
    <Box>
      <Menu isLazy closeOnSelect={false}>
        <Button
          as={MenuButton}
          size="sm"
          colorScheme={numStashes ? "red" : "blue"}
          animation={numStashes && stashAnimation}
          variant={numStashes ? "solid" : "ghost"}
          opacity={numStashes ? "1" : "0.5"}
        >
          {`${numStashes} stashed`}
        </Button>
        <MenuList>
          {customerStashes?.map((c, ii) => (
            <>
              {/* <MenuItem key={ii} fontWeight='semibold' onClick={() => editStash(c.id, c.stashType)}> */}
              <MenuItem
                key={ii}
                fontWeight="semibold"
                onKeyDownCapture={(e) => {
                  console.log(e)
                  e.key === "Enter" && editStash(c.id, "Customer")
                }}
                justifyContent="space-between"
              >
                <Text
                  textOverflow="ellipsis"
                  onClick={() => editStash(c.id, "Customer")}
                  // onClick={() => {
                  //   editStash(c.id, "Customer")
                  // }}
                >
                  {c.displayname}: {c.notes}
                </Text>
                <Icon
                  as={FcFullTrash}
                  h={5}
                  w={5}
                  onClick={async () => {
                    deleteStashMutation({ id: c.id, stashType: "Customer" })
                      .then(() => refetchStashes())
                      .catch((e) => console.log(`Error deleting customer stash: ${e}`))
                  }}
                />
              </MenuItem>
            </>
          ))}
          {locationStashes?.map((l, jj) => (
            <MenuItem
              key={jj}
              fontWeight="semibold"
              onKeyDownCapture={(e) => e.key === "Enter" && editStash(l.id, "Location")}
              justifyContent="space-between"
            >
              <Text textOverflow="ellipsis" onClick={() => editStash(l.id, "Location")}>
                {l.house} {l.street}: {l.notes}
              </Text>
              <Icon
                as={FcFullTrash}
                h={5}
                w={5}
                onClick={async () => {
                  deleteStashMutation({ id: l.id, stashType: "Location" })
                    .then(() => refetchStashes())
                    .catch((e) => console.log(`Error deleting location stash: ${e}`))
                }}
              />
            </MenuItem>
          ))}
          {jobStashes?.map((j, kk) => (
            <MenuItem
              key={kk}
              fontWeight="semibold"
              onKeyDownCapture={(e) => e.key === "Enter" && editStash(j.id, "Job")}
              justifyContent="space-between"
            >
              <Text textOverflow="ellipsis" onClick={() => editStash(j.id, "Job")}>
                {j.title}: {j.notes}
              </Text>
              <Icon
                as={FcFullTrash}
                h={5}
                w={5}
                onClick={async () => {
                  deleteStashMutation({ id: j.id, stashType: "Job" })
                    .then(() => refetchStashes())
                    .catch((e) => console.log(`Error deleting job stash: ${e}`))
                }}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default StashMenu
