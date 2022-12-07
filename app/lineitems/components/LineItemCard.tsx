import {
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { LineItem } from "@prisma/client"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { SlNotebook } from "react-icons/sl"
import { CgDollar } from "react-icons/cg"
import { FcAddRow, FcDeleteRow } from "react-icons/fc"

type LineItemCardProps = {
  lineitem: LineItem
  itemizing?: boolean
  onAdd?: (lineitemId: number) => void
  onDelete?: (lineitemId: number) => void
  // draggableIndex: number
  // isDragging?: boolean
}

const LineItemCard = ({
  lineitem,
  itemizing,
  onAdd,
  onDelete,
}: // draggableIndex,
LineItemCardProps) => {
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.100")
  const hoverBorderColor = useColorModeValue("blue.500", "blue.300")
  const headingBgColor = useColorModeValue("blackAlpha.300", "blackAlpha.400")
  const bodyBgColor = useColorModeValue("whiteAlpha.600", "blackAlpha.400")

  return (
    <Card
    // transition="border 50ms ease"
    // rounded='lg'
    // borderWidth={1}
    // borderTopRadius="lg"
    // borderColor={borderColor}
    // backdropFilter="auto"
    // backdropBlur={isDragging ? "3px" : "0px"}
    // bgColor="whiteAlpha.700"
    // flex="1 0 auto"
    // _hover={{ borderColor: hoverBorderColor }}
    // {...filterProps}
    // {...spaceProps}
    // m={m}
    >
      <Heading
        size="xs"
        p={2}
        // bg={headingBgColor}
        bgGradient="linear(to-b, blackAlpha.300, aliceblue)"
        borderBottomColor="cyan.300"
        borderBottomWidth={1}
        borderTopRadius="sm"
      >
        <HStack justify="space-between">
          <Text fontWeight="semibold">{lineitem.name}</Text>
          {itemizing && onAdd && (
            <IconButton
              aria-label="Add lineitem"
              as={FcAddRow}
              variant="ghost"
              // colorScheme='red'
              onClick={() => onAdd(lineitem.id)}
              size="xs"
              _hover={{ cursor: "pointer" }}
            />
          )}
          {itemizing && onDelete && (
            <IconButton
              aria-label="Delete lineitem"
              as={FcDeleteRow}
              variant="ghost"
              // colorScheme='red'
              onClick={() => onDelete(lineitem.id)}
              size="xs"
              _hover={{ cursor: "pointer" }}
            />
          )}
        </HStack>
      </Heading>

      <CardBody
        bg={bodyBgColor}
        // backdropFilter='blur(3px)'
        p={2}
      >
        <Tooltip label="cost">
          <Tag colorScheme="teal" size="sm">
            <TagLeftIcon as={CgDollar} />
            <TagLabel>{lineitem.cost}</TagLabel>
          </Tag>
        </Tooltip>

        <Popover trigger="hover" placement="top">
          <PopoverTrigger>
            <Tag colorScheme="gray" size="sm" ml={2}>
              <Icon as={SlNotebook} />
            </Tag>
          </PopoverTrigger>
          <PopoverContent bg="white">
            {/* <PopoverArrow /> */}
            <PopoverBody p={0} bg="white">
              <Textarea maxH="fit-content" bg="white" defaultValue={lineitem.notes ?? ""} />
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {/* {itemizing && onAdd && (
          <CardFooter p={0} pt={1}>
            <Button
              variant="solid"
              bg="red.100"
              onClick={() => onAdd(lineitem.id)}
              size="xs"
              borderWidth="1px solid"
              _hover={{ borderColor: "red.300" }}
            >
              Add to job
            </Button>
          </CardFooter>
        )} */}
        {/* {itemizing && onDelete && (
              <CardFooter p={0} pt={1}>
                <Button
                  variant="solid"
                  bg="red.100"
                  onClick={() => onDelete(lineitem.id)}
                  size="xs"
                  borderWidth="1px solid"
                  _hover={{ borderColor: "red.300" }}
                >
                  Delete from job
                </Button>
              </CardFooter>
            )} */}
      </CardBody>
    </Card>
  )
}

export default LineItemCard
