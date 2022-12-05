import { useQuery } from "@blitzjs/rpc"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  SpaceProps,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import findLineItem from "../queries/findLineItem"
import SearchResults from "app/search/SearchResults"
import { LineItem } from "@prisma/client"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { SlNotebook } from "react-icons/sl"
import { CgDollar } from "react-icons/cg"
import { Draggable } from "react-beautiful-dnd"

type LineItemCardProps = {
  lineitem: LineItem
  onAdd?: (lineitemId: number) => void
  itemizing?: boolean
  draggableIndex: number
  // isDragging?: boolean
  props?: SpaceProps
}

const LineItemCard = ({
  lineitem,
  onAdd,
  itemizing,
  draggableIndex,
  ...props
}: LineItemCardProps) => {
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.100")
  const hoverBorderColor = useColorModeValue("blue.500", "blue.300")
  const headingBgColor = useColorModeValue("blackAlpha.300", "blackAlpha.400")
  const bodyBgColor = useColorModeValue("whiteAlpha.600", "blackAlpha.400")

  return (
    <Draggable draggableId={lineitem.id.toString()} index={draggableIndex}>
      {(provided, isDragging: boolean) => (
        <Card
          transition="border 50ms ease"
          borderWidth={1}
          borderTopRadius="md"
          borderColor={borderColor}
          backdropFilter="auto"
          backdropBlur={isDragging ? "3px" : "0px"}
          bgColor="whiteAlpha.700"
          mx="8px"
          ref={provided.innerRef}
          _hover={{ borderColor: hoverBorderColor }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          {...props}
        >
          <Heading
            size="xs"
            p={2}
            bg={headingBgColor}
            borderRadius="sm"
            borderBottomColor="cyan.300"
            borderBottomWidth={1}
            // backdropFilter='auto'
            // backdropBlur='4px'
          >
            {lineitem.name}
          </Heading>

          <CardBody
            borderBottomRadius="md"
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

            {itemizing && (
              <CardFooter p={0} pt={1}>
                <Button
                  variant="solid"
                  bg="red.100"
                  onClick={() => onAdd!(lineitem.id)}
                  size="xs"
                  borderWidth="1px solid"
                  _hover={{ borderColor: "red.300" }}
                >
                  Add to job
                </Button>
              </CardFooter>
            )}
          </CardBody>
        </Card>
      )}
    </Draggable>
  )
}

export default LineItemCard
