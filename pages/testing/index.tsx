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
import getLineItem from "app/lineitems/queries/getLineItem"

const Testing: BlitzPage = () => {
  const [lineitemsSource] = useQuery(
    getLineItems,
    { orderBy: { id: "asc" } },
    { refetchOnWindowFocus: false }
  )
  const [lineitemsJob, setLineItems2] = useState<LineItem[]>([])

  const onAdd = (liId: number) => {
    const idx = lineitemsJob.findIndex(({ id }) => id == liId)
    // console.log({ idx })

    if (lineitemsJob.findIndex(({ id }) => id === liId) !== -1) return

    const adding = lineitemsSource.find(({ id }) => id === liId)
    if (adding) setLineItems2([...lineitemsJob, adding])
  }

  const onDragEnd = async ({ destination, source, draggableId }) => {
    if (!destination) return
    const start = source.droppableId
    const end = destination.droppableId
    const sortOrder = [...lineitemsJob.map(({ id }) => id)]
    // console.log(source, destination, draggableId)

    if (start === end) {
      if (source.index === destination.index) return
      if (start === "lineitem-list1") return

      // const newLineitems = Array.from(lis)
      const spliced = sortOrder.splice(source.index, 1)
      sortOrder.splice(destination.index, 0, spliced.at(0)!)
      lineitemsJob.sort((a, b) => {
        return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id)
      })

      // console.log(sortOrder, { ...lineitemsJob })
      return
    } else {
      if (lineitemsJob.findIndex(({ id }) => id == draggableId) !== -1) return

      const moving = lineitemsSource.find(({ id }) => id == draggableId)
      // const sortOrder = [...lineitems2.map(({ id }) => id)]
      lineitemsJob.splice(destination.index, 0, moving!)

      return
    }

    // const moveUnit = lineitems1.find(({ id }) => id == draggableId)
    // console.log(draggableId)
    // console.log({ moveUnit })

    // const newLineitems = Array.from(lis)
    // // const spliced = newLineitems.splice(source.index, 1)
    // // console.log({ ...spliced })
    // newLineitems.splice(destination.index, 0, moveUnit!)

    // setLis(newLineitems)
    // console.log({ newLineitems })
  }

  // console.log({ lis })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex>
        <Box border="1px solid lightgray" p="8px" display="flex" flexDirection="column">
          <Heading>Line items</Heading>
          {/* <Divider /> */}

          <Droppable droppableId={"lineitem-list1"}>
            {(provided, snapshot) => (
              <Box
                bgColor={snapshot.isDraggingOver ? "blue.100" : "inherit"}
                transition="1s ease"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {lineitemsSource.map((li, ii) => (
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
                    onAdd={onAdd}
                    draggableIndex={ii}
                    mb="8px"
                    // isDragging={snapshot.isDragging}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
        <Box border="1px solid lightgray" p={2}>
          <Heading>New (300gpd)</Heading>

          <Droppable droppableId={"lineitem-list2"}>
            {(provided, snapshot) => (
              <Box
                bgColor={snapshot.isDraggingOver ? "lemonchiffon" : "inherit"}
                transition="1s ease"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {lineitemsJob.map((li, ii) => (
                  <Draggable key={li.id} index={ii} draggableId={li.name}>
                    {(provided) => (
                      <Box
                        border="1px solid lightgray"
                        borderRadius="md"
                        m={2}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {li.name}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </Flex>
    </DragDropContext>
  )
}

// Testing.getLayout = (page) => <TestLayout subheader={<Subheader />}>{page}</TestLayout>
export default Testing
