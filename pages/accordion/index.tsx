import { BlitzPage } from "@blitzjs/next"
import { Button, Collapse, Flex, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

const AccordionTest: BlitzPage = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Flex>
      <VStack>
        <Button size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          Expand
        </Button>
        <Collapse in={isExpanded} animateOpacity>
          Test
        </Collapse>
      </VStack>
    </Flex>
  )
}

export default AccordionTest
