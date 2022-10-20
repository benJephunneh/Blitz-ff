import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spacer,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react"
import getFieldErrorMessage from "app/core/components/forms/helpers/getFieldErrorMessage"
import { addDays, format, formatDistance } from "date-fns"
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef, useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import { useField, UseFieldConfig } from "react-final-form"

interface LabeledDateFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label: string
  initialDate?: Date
  start?: Date
  end?: Date
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<Date>
}

export const LabeledDateField = forwardRef<HTMLInputElement, LabeledDateFieldProps>(
  ({ name, label, initialDate, start, end, outerProps, labelProps, fieldProps, ...props }, ref) => {
    const { input, meta } = useField(name)
    const { value, onChange } = input
    // const { input, meta } = useField(name)
    const error = getFieldErrorMessage(meta)
    // const [value, onChange] = useState<Date>()
    const [startDateTime, setStartDateTime] = useState<Date>(new Date())
    const [endDateTime, setEndDateTime] = useState<Date>(new Date())

    useEffect(() => {
      onChange([start, end])
    }, []) // eslint-disable-line

    // useEffect(() => {
    //   // console.log(JSON.stringify(value))
    //   if (!Array.isArray(value)) return

    //   (async () => {
    //     setStartDateTime(value.at(0).setHours(9, 0, 0, 0))
    //     setEndDateTime(value.at(1).setHours(17, 0, 0, 0))
    //   })().catch((e) => console.log(e.message))
    // }, [value])

    // const normalizedError = Array.isArray(error)
    //   ? error.join(', ')
    //   : error || submitError

    return (
      <FormControl {...outerProps}>
        {/* <FormLabel {...labelProps}>{label}</FormLabel> */}
        <Accordion allowToggle>
          <AccordionItem>
            <Heading>
              <AccordionButton bg="white" fontWeight="semibold" justifyContent="center">
                {label}
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel>
              <Calendar onChange={onChange} value={value} selectRange />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Flex>
          <VStack w="full">
            <HStack w="full" justify="space-between" bg="yellow.100" px={2}>
              <Box alignSelf="end">
                <Stat>
                  <StatLabel>Start</StatLabel>
                  {Array.isArray(value) && value.at(0) !== undefined && (
                    <>
                      <Text as={StatNumber}>{`${format(value.at(0), "HHmm EEEE")}`}</Text>
                      <StatHelpText>{formatDistance(value.at(0), new Date())}</StatHelpText>
                    </>
                  )}
                </Stat>
              </Box>
              {/* <Spacer /> */}
              <Box alignSelf="center">
                <Stat>
                  {Array.isArray(value) && value.at(0) !== undefined && (
                    <Text as={StatNumber}>{`${format(value.at(0), "do MMM")}`}</Text>
                  )}
                </Stat>
              </Box>
            </HStack>
            <Divider />
            <HStack w="full" justify="space-between" bg="yellow.100" px={2}>
              <Box alignSelf="end">
                <Stat>
                  <StatLabel>End</StatLabel>
                  {Array.isArray(value) && value.at(1) !== undefined && (
                    <>
                      <Text as={StatNumber}>{`${format(value.at(1), "HHmm EEEE")}`}</Text>
                      <StatHelpText>{formatDistance(value.at(1), new Date())}</StatHelpText>
                    </>
                  )}
                </Stat>
              </Box>
              {/* <Spacer /> */}
              <Box alignSelf="center">
                <Stat>
                  {Array.isArray(value) && value.at(1) !== undefined && (
                    <Text as={StatNumber}>{`${format(value.at(1), "do MMM")}`}</Text>
                  )}
                </Stat>
              </Box>
            </HStack>
          </VStack>
        </Flex>
        {/* <Text
          disabled={meta.submitting}
          ref={ref}
          defaultValue={value.toString()}
          onChange={onChange}
          {...props}
        /> */}
      </FormControl>
    )
  }
)
