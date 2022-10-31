import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react"
import { useContext, useRef } from "react"
import headerContext from "../../headerContext"

const DataPicker = () => {
  const { customerId, subheader, pickSubheader } = useContext(headerContext)

  return (
    <Menu isLazy>
      <MenuButton fontWeight="bold" disabled={!customerId}>{`Data mode`}</MenuButton>
      <MenuList>
        <MenuItem>
          <Text fontWeight="semibold" textColor="tomato">{`${subheader} mode`}</Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem disabled={subheader === "Customer"}>
          <Text
            fontWeight="semibold"
            onClick={() => pickSubheader("Customer")}
            _hover={{ cursor: "pointer" }}
          >
            Customer
          </Text>
        </MenuItem>
        <MenuItem disabled={subheader === "Location"}>
          <Text
            fontWeight="semibold"
            onClick={() => pickSubheader("Location")}
            _hover={{ cursor: "pointer" }}
          >
            Location
          </Text>
        </MenuItem>
        <MenuItem disabled={subheader === "Job"}>
          <Text
            fontWeight="semibold"
            onClick={() => pickSubheader("Job")}
            _hover={{ cursor: "pointer" }}
          >
            Job
          </Text>
        </MenuItem>
        <MenuItem disabled={subheader === "Invoice"}>
          <Text
            fontWeight="semibold"
            onClick={() => pickSubheader("Invoice")}
            _hover={{ cursor: "pointer" }}
          >
            Invoice
          </Text>
        </MenuItem>
        <MenuItem disabled={subheader === "Estimate"}>
          <Text
            fontWeight="semibold"
            onClick={() => pickSubheader("Estimate")}
            _hover={{ cursor: "pointer" }}
          >
            Estimate
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
    // <Popover>
    //   <PopoverTrigger>
    //     <Button
    //       size='sm'
    //       fontWeight='bold'
    //       textColor={useColorModeValue('gray.500', 'gray.300')}
    //       borderColor={useColorModeValue('blue.300', 'blue.200')}
    //       variant='outline'
    //     >
    //       {`${subheader} mode`}
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent color='white' bg='blue.800' borderColor='whiteAlpha.50'>
    //     <PopoverHeader fontWeight='bold' border={0}>
    //       Customer data
    //     </PopoverHeader>
    //     <PopoverArrow />
    //     <PopoverCloseButton />
    //     <PopoverBody mt={4}>
    //       <Text
    //         fontWeight='semibold'
    //         onClick={() => pickSubheader('Customer')}
    //         _hover={{ cursor: 'pointer' }}
    //       >
    //         Customer
    //       </Text>
    //       <Text
    //         fontWeight='semibold'
    //         onClick={() => pickSubheader('Location')}
    //         _hover={{ cursor: 'pointer' }}
    //       >
    //         Location
    //       </Text>
    //       <Text
    //         fontWeight='semibold'
    //         onClick={() => pickSubheader('Job')}
    //         _hover={{ cursor: 'pointer' }}
    //       >
    //         Job
    //       </Text>
    //       <Text
    //         fontWeight='semibold'
    //         onClick={() => pickSubheader('Invoice')}
    //         _hover={{ cursor: 'pointer' }}
    //       >
    //         Invoice
    //       </Text>
    //       <Text
    //         fontWeight='semibold'
    //         onClick={() => pickSubheader('Estimate')}
    //         _hover={{ cursor: 'pointer' }}
    //       >
    //         Estimate
    //       </Text>
    //     </PopoverBody>
    //     {/* <PopoverFooter
    //       border={0}
    //       display='flex'
    //       alignItems='center'
    //     >
    //       asdfsdfjoiew90 9wef
    //     </PopoverFooter> */}
    //   </PopoverContent>
    // </Popover>
  )
}

export default DataPicker
