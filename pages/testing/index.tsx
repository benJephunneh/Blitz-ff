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

const Testing: BlitzPage = () => {
  const [lineitems] = useQuery(getLineItems, {})

  const onDragEnd = () => {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container border="1px solid lightgray" p="8px">
        <Heading>Line items</Heading>
        <Divider />

        <Droppable droppableId={lineitems.length}>
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {lineitems.map((li, ii) => (
                <Draggable key={li.id} draggableId={ii} index={ii}>
                  {(provided2) => (
                    <Box
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="sm"
                      p={1}
                      m="8px"
                      transition="50ms ease-in-out"
                      _hover={{ borderColor: "blue.400" }}
                      {...provided2.draggableProps}
                      {...provided2.dragHandleProps}
                      ref={provided2.innerRef}
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
      </Container>
    </DragDropContext>
  )
}

// Testing.getLayout = (page) => <TestLayout subheader={<Subheader />}>{page}</TestLayout>
export default Testing
