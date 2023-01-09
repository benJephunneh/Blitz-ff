import { Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  keyframes,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { FaPlus } from "react-icons/fa"
import getStashes from "app/stashes/queries/getStashes"
import { FcFullTrash } from "react-icons/fc"
import deleteStash from "app/stashes/mutations/deleteStash"
import LocationModalForm from "app/locations/components/LocationModalForm"
import headerContext from "./headerContext"
import userContext from "app/auth/components/contexts/userContext"
import deleteTask from "app/tasks/mutations/deleteTask"

const HeaderLoggedIn = () => {
  const router = useRouter()
  const { logOut } = useContext(userContext)
  const {
    createCustomer,
    customerStashes,
    locationStashes,
    jobStashes,
    numStashes,
    editStash,
    refetchStashes,
    tasks,
    createTask,
    pickTask,
    refetchTasks,
  } = useContext(headerContext)

  const [deleteStashMutation] = useMutation(deleteStash)
  const [deleteTaskMutation] = useMutation(deleteTask)

  const numTasks = tasks.length

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

  //   const taskKeyframes = keyframes`
  //     from { background-color: ${useColorModeValue("orange", "yellow")}; color: ${useColorModeValue(
  //     "white",
  //     "black"
  //   )} }
  //       to { background-color: ${useColorModeValue("white", "#4a5568")}; color: ${useColorModeValue(
  //     "orange",
  //     "yellow"
  //   )} }`
  //   const taskAnimation = `${taskKeyframes} 1s alternate infinite`

  // const parsed = JSON.parse(customerStashes[0]!.notes)
  // console.log(parsed.content[0].content[0].text)

  return (
    <Box justifyContent="flex-end">
      {/* <CustomerModalForm
        stashId={stashId}
        // customerStash={customerStash}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={async (customer) => {
          setEditingCustomer(false)
          // await refetchStashes()
          if (customer) {
            if ("notes" in customer) {
              refetchStashes().catch((e) =>
                console.log(`HeaderLoggedIn customer stash error: ${e}`)
              )
            } else {
              if (stashId) await refetchStashes()
              router
                .push(Routes.ShowCustomerPage({ customerId: customer.id }))
                .catch((e) => console.log(`HeaderLoggedIn createCustomer error: ${e}`))
            }
          }
        }}
      /> */}

      {/* <LocationModalForm
        stashId={stashId}
        customerId={customerId!}
        isOpen={editingLocation}
        onClose={() => setEditingLocation(false)}
        onSuccess={async (location) => {
          setEditingLocation(false)
          if (location) {
            if ("notes" in location) {
              refetchStashes().catch((e) =>
                console.log(`HeaderLoggedIn location stash error: ${e}`)
              )
            } else {
              pickLocation(location.id)
              // router
              //   .push(Routes.ShowLocationPage({ customerId: customerId!, locationId: location.id }))
              //   .catch((e) => console.log(`HeaderLogggedIn createLocation error: ${e}`))
            }
          }
        }}
      /> */}

      <HStack spacing={4}>
        <Box>
          <Menu isLazy closeOnSelect={false}>
            <Button
              as={MenuButton}
              size="sm"
              colorScheme={numTasks ? "orange" : "blue"}
              //   animation={numTasks && taskAnimation}
              variant={numTasks ? "outline" : "ghost"}
              bgColor={numTasks ? "orange.100" : "inherit"}
              opacity={numTasks ? "1" : "0.5"}
            >
              {numTasks ? `${numTasks}` : "T"}
            </Button>
            <MenuList>
              <MenuItem
                fontWeight="semibold"
                onKeyDownCapture={(e) => {
                  e.preventDefault()
                  e.key === "Enter" && createTask()
                }}
                justifyContent="space-between"
              >
                <Text textOverflow="ellipsis" onClick={createTask}>
                  New task
                </Text>
                <Icon
                  as={FaPlus}
                  color="orange"
                  // h={5}
                  // w={5}
                  onClick={createTask}
                />
              </MenuItem>
              {tasks?.map((t, ii) => (
                <>
                  <MenuItem
                    key={ii}
                    fontWeight="semibold"
                    onKeyDownCapture={(e) => {
                      e.preventDefault()
                      e.key === "Enter" && pickTask(t.id)
                    }}
                    justifyContent="space-between"
                  >
                    <Text textOverflow="ellipsis" onClick={() => pickTask(t.id)}>
                      {t.title}: {t.notes}
                    </Text>
                    <Icon
                      as={FcFullTrash}
                      h={5}
                      w={5}
                      onClick={async () => {
                        deleteTaskMutation({ id: t.id })
                          .then(() => refetchTasks())
                          .catch(console.error)
                      }}
                    />
                  </MenuItem>
                </>
              ))}
            </MenuList>
          </Menu>
          <Menu isLazy closeOnSelect={false}>
            <Button
              as={MenuButton}
              size="sm"
              colorScheme={numStashes ? "red" : "blue"}
              animation={numStashes && stashAnimation}
              variant={numStashes ? "solid" : "ghost"}
              opacity={numStashes ? "1" : "0.5"}
            >
              {numStashes ? `${numStashes}` : "S"}
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
                    {l.house} {l.street}: {JSON.parse(l.notes).content[0].content[0].text}
                  </Text>
                  <Spacer />
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
                    {j.title}: {JSON.parse(j.notes).content[0].content[0].text}
                  </Text>
                  <Spacer />
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
        <Button
          size="sm"
          variant="outline"
          textColor={useColorModeValue("cyan.600", "cyan.400")}
          borderColor={useColorModeValue("gray.300", "gray.500")}
          borderWidth={1}
          borderStyle="dashed"
          onClick={createCustomer}
          _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
          leftIcon={<FaPlus size={10} />}
        >
          New customer
        </Button>
        <Button
          size="sm"
          variant="outline"
          color={useColorModeValue("blackAlpha.600", "gray.300")}
          bg={useColorModeValue("blackAlpha.100", "gray.700")}
          borderColor={useColorModeValue("gray.50", "blackAlpha.100")}
          borderWidth={1}
          textColor="current"
          onClick={logOut}
          _hover={{ bg: useColorModeValue("blackAlpha.300", "gray.900") }}
        >
          Log out
        </Button>
      </HStack>
    </Box>
  )
}

export default HeaderLoggedIn
