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
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import getFieldErrorMessage from "app/core/components/forms/helpers/getFieldErrorMessage"
import { addDays, format, formatDistance } from "date-fns"
import { useRouter } from "next/router"
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef, useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import { useField, UseFieldConfig } from "react-final-form"

import "react-calendar/dist/Calendar.css"

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
    const error = getFieldErrorMessage(meta)

    useEffect(() => {
      onChange([start, end])
    }, [])

    // const normalizedError = Array.isArray(error)
    //   ? error.join(', ')
    //   : error || submitError

    return (
      <FormControl {...outerProps}>
        {/* <FormLabel {...labelProps}>{label}</FormLabel> */}
        <Accordion allowToggle>
          <AccordionItem>
            <Heading>
              <AccordionButton
                bg={useColorModeValue("white", "gray.600")}
                fontWeight="semibold"
                justifyContent="center"
              >
                {label}
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel>
              <Calendar
                showWeekNumbers
                onChange={onChange}
                value={value}
                selectRange
                onClickDay={() => console.log("Clicked day")}
                onClickWeekNumber={() => console.log("Clicked week")}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Flex>
          <VStack w="full">
            <HStack
              w="full"
              justify="space-between"
              bg={useColorModeValue("yellow.100", "#615e33")}
              px={2}
            >
              <Box alignSelf="end">
                <Stat>
                  <StatLabel>Start</StatLabel>
                  {Array.isArray(value) && value.some((v) => v !== undefined) && (
                    <>
                      <StatNumber>{`${format(value.at(0), "HHmm EEEE")}`}</StatNumber>
                      {/* <Text as={StatNumber}>{`${format(value.at(0), "HHmm EEEE")}`}</Text> */}
                      <StatHelpText>{formatDistance(value.at(0), new Date())}</StatHelpText>
                    </>
                  )}
                </Stat>
              </Box>
              {/* <Spacer /> */}
              <Box alignSelf="center">
                <Stat>
                  {Array.isArray(value) && value.some((v) => v !== undefined) && (
                    <Text as={StatNumber}>{`${format(value.at(0), "do MMM")}`}</Text>
                  )}
                </Stat>
              </Box>
            </HStack>
            <Divider />
            <HStack
              w="full"
              justify="space-between"
              bg={useColorModeValue("yellow.100", "#615e33")}
              px={2}
            >
              <Box alignSelf="end">
                <Stat>
                  <StatLabel>End</StatLabel>
                  {Array.isArray(value) && value.some((v) => v !== undefined) && (
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
                  {Array.isArray(value) && value.some((v) => v !== undefined) && (
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
