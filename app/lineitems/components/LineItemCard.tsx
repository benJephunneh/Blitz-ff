import { useQuery } from "@blitzjs/rpc"
import {
  Card,
  CardBody,
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

type LineItemCardProps = {
  lineitem: LineItem
  props?: SpaceProps
}

const LineItemCard = ({ lineitem, props }: LineItemCardProps) => {
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.100")
  const hoverBorderColor = useColorModeValue("blue.500", "blue.300")

  return (
    <Card
      transition="border 50ms ease"
      borderWidth={1}
      borderRadius="md"
      borderColor={borderColor}
      _hover={{ borderColor: hoverBorderColor }}
      {...props}
    >
      <Heading size="xs" p={2}>
        {lineitem.name}
      </Heading>

      <CardBody borderRadius="md" borderWidth={1} borderColor={borderColor} bg="white">
        <Tooltip label="cost">
          <Tag colorScheme="teal" size="sm">
            <TagLeftIcon as={CgDollar} />
            <TagLabel>{lineitem.cost}</TagLabel>
          </Tag>
        </Tooltip>

        <Popover trigger="hover">
          <PopoverTrigger>
            <Tag colorScheme="gray" size="sm" ml={2}>
              <Icon as={SlNotebook} />
            </Tag>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody p={0}>
              <Textarea maxH="fit-content">{lineitem.notes}</Textarea>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </CardBody>
    </Card>
  )
}

export default LineItemCard
