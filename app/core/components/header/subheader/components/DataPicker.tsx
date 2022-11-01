import {
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import headerContext from "../../headerContext"

type DataMode = "Customer" | "Location" | "Job" | "Invoice" | "Estimate"

const DataPicker = () => {
  const { customer } = useContext(headerContext)
  const [dataMode, setDataMode] = useState<DataMode>()
  useEffect(() => {
    setDataMode("Customer")
  }, [customer])

  return (
    <Menu isLazy>
      <MenuButton fontWeight="semibold" fontStyle="italic" disabled={!customer?.id}>
        Data mode
      </MenuButton>
      <MenuList>
        <MenuGroup title={`${dataMode} data`}>
          <MenuItem disabled={dataMode === "Customer"}>
            <Text
              // fontWeight="semibold"
              onClick={() => setDataMode("Customer")}
              _hover={{ cursor: "pointer" }}
            >
              Customer
            </Text>
          </MenuItem>
          <MenuItem disabled={dataMode === "Location"}>
            <Text
              // fontWeight="semibold"
              onClick={() => setDataMode("Location")}
              _hover={{ cursor: "pointer" }}
            >
              Location
            </Text>
          </MenuItem>
          <MenuItem disabled={dataMode === "Job"}>
            <Text
              // fontWeight="semibold"
              onClick={() => setDataMode("Job")}
              _hover={{ cursor: "pointer" }}
            >
              Job
            </Text>
          </MenuItem>
          <MenuItem disabled={dataMode === "Invoice"}>
            <Text
              // fontWeight="semibold"
              onClick={() => setDataMode("Invoice")}
              _hover={{ cursor: "pointer" }}
            >
              Invoice
            </Text>
          </MenuItem>
          <MenuItem disabled={dataMode === "Estimate"}>
            <Text
              // fontWeight="semibold"
              onClick={() => setDataMode("Estimate")}
              _hover={{ cursor: "pointer" }}
            >
              Estimate
            </Text>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default DataPicker
