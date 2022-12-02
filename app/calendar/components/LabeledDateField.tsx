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
  Select,
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
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  PropsWithoutRef,
  useEffect,
  useState,
} from "react"
import { Calendar, Detail } from "react-calendar"
import { useField, UseFieldConfig } from "react-final-form"

import "react-calendar/dist/Calendar.css"
import { r } from "@blitzjs/auth/dist/index-57d74361"
import timeRange9_17 from "../helpers/timeRange9_17"

// const timerange = () => {
//   const timeArray = Array<number>(17)
//   for (let ii = 0; ii <= 16; ii++) {
//     // to 16 because there are 16+1 half-hour segments from 9-17.
//     const nextTime = 900 + (ii % 2 === 0 ? (ii / 2) * 100 : Math.floor(ii / 2) * 100 + 30)
//     timeArray.push(nextTime)
//   }
//   // console.log(timeArray)
//   return timeArray
// }

interface LabeledDateFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label: string
  // initialDate?: Date
  start?: Date
  end?: Date
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<Date>
  onClickDay?: (day: Date) => void
  onClickWeekNumber?: (w: number) => void
}

export const LabeledDateField = forwardRef<HTMLInputElement, LabeledDateFieldProps>(
  (
    {
      name,
      label,
      // initialDate,
      start,
      end,
      outerProps,
      labelProps,
      fieldProps,
      onClickDay,
      onClickWeekNumber,
      ...props
    },
    ref
  ) => {
    const { input, meta } = useField(name)
    const { value, onChange } = input
    const error = getFieldErrorMessage(meta)
    const initialRange = start && end ? [start, end] : undefined

    const timeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // console.log(e)
      // console.log(e.target.name)
      const r = [...value.map((v) => new Date(v))]
      // console.log({ r })
      const newHour = Number(e.target.value) / 100
      const newMinute = Number(e.target.value) % 100
      switch (e.target.name) {
        case "start":
          r.at(0).setHours(newHour, newMinute, 0, 0)
          break
        case "end":
          r.at(1).setHours(newHour, newMinute, 0, 0)
          break
        default:
          break
      }
      // console.log(r)
      onChange(r)
    }

    // useEffect(() => {
    //   onChange([start, end])
    // }, [])

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
                onChange={(r) => {
                  r[0].setHours(9, 0, 0, 0)
                  r[1].setHours(17, 0, 0, 0)
                  onChange(r)
                }}
                defaultValue={initialRange}
                onClickDay={onClickDay}
                onClickWeekNumber={onClickWeekNumber}
                selectRange
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
                      <HStack as={StatNumber}>
                        <Select
                          name="start"
                          variant="unstyled"
                          defaultValue={900}
                          fontWeight="semibold"
                          fontSize="2xl"
                          onChange={timeChange}
                        >
                          {timeRange9_17().map((t, ii) => (
                            <option key={ii} value={t}>
                              {t}
                            </option>
                          ))}
                        </Select>
                        <Text>{`${format(value.at(0), "EEEE")}`}</Text>
                      </HStack>
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
                      <HStack as={StatNumber}>
                        <Select
                          name="end"
                          variant="unstyled"
                          defaultValue={1700}
                          fontWeight="semibold"
                          fontSize="2xl"
                          onChange={timeChange}
                        >
                          {timeRange9_17().map((t, ii) => (
                            <option key={ii} value={t}>
                              {t}
                            </option>
                          ))}
                        </Select>
                        <Text>{`${format(value.at(1), "EEEE")}`}</Text>
                      </HStack>
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
