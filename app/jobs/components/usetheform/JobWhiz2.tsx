import {
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalBody,
  ModalFooter,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { Job } from "@prisma/client"
import InputUtf from "app/core/components/forms/usetheform/components/InputUtf"
import TextareaUtf from "app/core/components/forms/usetheform/components/TextareaUTF"
import Submit from "app/core/components/forms/usetheform/components/Submit"
import Reset from "app/core/components/forms/usetheform/components/Reset"
import { Form, useValidation } from "usetheform"
import { z } from "zod"
import { JobFormSchema } from "app/jobs/validations"
import findLineItem from "app/lineitems/queries/findLineItem"
import { useQuery } from "@blitzjs/rpc"
import { useContext, useState } from "react"
import headerContext from "app/core/components/header/headerContext"

type JobWhiz2Props = {
  job?: Job
  next: () => void
  prev: () => void
}

const page1Schema = z.object({
  title: z.string(),
  notes: z.string().nullable().optional(),
})

const validateForm = (f) => {
  try {
    JobFormSchema.pick({
      lineitems: true,
    }).parse(f)
  } catch ({ errors }) {
    if (errors[0].path === "") return { all: errors[0].message }
    else {
      return errors.reduce((acc, errObj) => {
        const namefield = errObj.path[0]
        acc = {
          ...acc,
          [namefield]: errObj.message,
        }

        return acc
      }, {})
    }
  }
}

const JobWhiz2 = ({ job, next, prev, ...props }: JobWhiz2Props) => {
  const { lineitems, setLineitems } = useContext(headerContext)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [{ error }, validation] = useValidation([validateForm])
  const [query, setQuery] = useState("")
  const [lineitemSearchResults, { setQueryData: setLineitemSearchData, isLoading }] = useQuery(
    findLineItem,
    { query },
    { enabled: !!query, refetchOnWindowFocus: false }
  )
  const searchProvider = {
    query,
    setQuery,
    lineitems,
    lineitemSearchResults,
    isLoading,
    setLineitems,
  }

  const initialState = {
    title: job?.title ?? "",
    start: job?.start ?? null,
    end: job?.start ?? null,
    completed: job?.completed ?? false,
    locateRequired: job?.locateRequired ?? false,
    notes: job?.notes ?? null,
  }

  // console.log('validation', { ...validation })
  // console.log('props', { ...props })

  return (
    <Form
      // touched
      // initialState={initialState}
      // onSubmit={v => {
      //   onSubmit(v)
      //     .then(async j => {
      //       onSuccess?.(j)
      //       await submitTasks(j)
      //     })
      //     .catch(console.error)
      // }}
      {...validation}
      {...props}
    >
      <Flex direction="column">
        <Menu>
          {/* <Input
            as={Button}
            isActive={isOpen}
            placeholder="Enter line item description..."
            border='1px solid'
            borderColor='blackAlpha.100'
            onChange={onOpen}
          /> */}
          <MenuButton isActive={isOpen} as={Button}>
            <Input placeholder="Enter line item description..." />
          </MenuButton>
          <MenuList>
            <MenuItem>asdf</MenuItem>
            <MenuItem>ojfwef</MenuItem>
            <MenuItem>0e0wef</MenuItem>
            <MenuItem>asdfjweon</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Button variant="solid" bg="blackAlpha.200" type="button" onClick={prev}>
        Previous
      </Button>
      <Reset />
      <Submit onClick={next}>Next</Submit>
    </Form>
  )
}

export default JobWhiz2
