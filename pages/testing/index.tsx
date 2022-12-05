import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Box, Button, Container, Divider, Flex, Heading, HStack, Switch } from "@chakra-ui/react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import getLineItems from "app/lineitems/queries/getLineItems"
import { useEffect, useState } from "react"
import { LoremIpsum } from "react-lorem-ipsum"
import Subheader from "./Subheader"
import TestLayout from "./TestLayout"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import LineItemCard from "app/lineitems/components/LineItemCard"
import { LineItem } from "@prisma/client"

const Testing: BlitzPage = () => {
  const [lineitems, { setQueryData }] = useQuery(getLineItems, {}, { refetchOnWindowFocus: false })
  const [lis, setLis] = useState<LineItem[]>(lineitems)

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    console.log(source, destination, draggableId)

    const newLineitems = Array.from(lis)
    const spliced = newLineitems.splice(source.index, 1)
    console.log({ ...spliced })
    newLineitems.splice(destination.index, 0, spliced.at(0)!)

    setLis(newLineitems)
    // console.log({ newLineitems })
  }

  console.log({ lis })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container border="1px solid lightgray" p="8px">
        <Heading>Line items</Heading>
        {/* <Divider /> */}

        <Droppable droppableId={"lineitem-list"}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              bgColor={snapshot.isDraggingOver ? "blue.100" : "inherit"}
              transition="1000ms ease"
            >
              {lis.map((li, ii) => (
                // <Draggable key={li.id} draggableId={ii.toString()} index={ii}>
                //   {(provided2) => (
                //     <Box
                //       border="1px solid"
                //       borderColor="gray.200"
                //       borderRadius="sm"
                //       p={2}
                //       mb="8px"
                //       transition="50ms ease-in-out"
                //       _hover={{ borderColor: "blue.400" }}
                //       {...provided2.draggableProps}
                //       {...provided2.dragHandleProps}
                //       ref={provided2.innerRef}
                //     >
                //       {li.name}
                //     </Box>
                //   )}
                // </Draggable>
                <LineItemCard
                  key={li.id}
                  lineitem={li}
                  itemizing={true}
                  draggableIndex={ii}
                  mb="8px"
                  // isDragging={snapshot.isDragging}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  )
}

// Testing.getLayout = (page) => <TestLayout subheader={<Subheader />}>{page}</TestLayout>
export default Testing
