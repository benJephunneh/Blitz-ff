import { useQuery } from "@blitzjs/rpc"
import {
  Button,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  useColorModeValue,
} from "@chakra-ui/react"
import { useContext } from "react"
import { FaChevronDown } from "react-icons/fa"
import { FcFile } from "react-icons/fc"
import headerContext from "./header/headerContext"

const FilePicker = () => {
  const { customerId } = useContext(headerContext)
  // const [files, {refetch: refetchFiles }] = useQuery(
  //   getFiles, {
  //     where: { customerId },
  //   }, {
  //     enabled: !!customerId,
  //     refetchOnWindowFocus: false,
  //     refetchInterval: 10000,
  //     refetchIntervalInBackground: true,
  //   }
  // )

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        size="sm"
        variant="solid"
        px={1}
        ml={2}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
        bg="gray.100"
        _hover={{ bg: "white" }}
      >
        <HStack>
          <Icon as={FcFile} w={5} h={5} />
          <Heading size="sm" opacity={useColorModeValue("0.7", "0.9")}>
            Files
          </Heading>
        </HStack>
      </MenuButton>
    </Menu>
  )
}

export default FilePicker
