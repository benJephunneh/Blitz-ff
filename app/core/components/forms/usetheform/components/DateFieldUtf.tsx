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
  Heading,
  HStack,
  Input,
  Select,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import getFieldErrorMessage from "app/core/components/forms/helpers/getFieldErrorMessage"
import { addDays, format, formatDistance, isFriday } from "date-fns"
import React, { ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { Calendar } from "react-calendar"

import "react-calendar/dist/Calendar.css"
import { useField } from "usetheform"

interface DateFieldUtfProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label: string
  // initialDate?: Date
  start?: Date
  end?: Date
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  isRequired?: boolean
  error?: string
  onClickDay?: (day: Date) => void
  onClickWeekNumber?: (w: number) => void
}

const DateFieldUtf = ({
  name,
  label,
  // initialDate,
  start,
  end,
  outerProps,
  labelProps,
  isRequired,
  error,
  onClickDay,
  onClickWeekNumber,
  ...props
}: DateFieldUtfProps) => {
  const fieldProps = useField({
    type: "date",
    name,
  })
  const isInvalid = error !== undefined

  // const timeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   // console.log(e)
  //   // console.log(e.target.name)
  //   const r = [...value.map((v) => new Date(v))]
  //   // console.log({ r })
  //   const newHour = Number(e.target.value) / 100
  //   const newMinute = Number(e.target.value) % 100
  //   switch (e.target.name) {
  //     case "start":
  //       r.at(0).setHours(newHour, newMinute, 0, 0)
  //       break
  //     case "end":
  //       r.at(1).setHours(newHour, newMinute, 0, 0)
  //       break
  //     default:
  //       break
  //   }
  //   // console.log(r)
  //   onChange(r)
  // }

  // useEffect(() => {
  //   onChange([start, end])
  // }, [])

  // const normalizedError = Array.isArray(error)
  //   ? error.join(', ')
  //   : error || submitError

  // const unschedule = () => {
  //   onChange([null, null])
  // }

  // const scheduleTomorrow = () => {
  //   const today = [new Date(), new Date()] as const
  //   let nextBusinessDay: Date[]

  //   if (today.some(isFriday)) nextBusinessDay = today.map((d) => addDays(d!, 3))
  //   else nextBusinessDay = today.map((d) => addDays(d!, 1))

  //   onChange([nextBusinessDay.at(0)?.setHours(9), nextBusinessDay.at(1)?.setHours(17)])
  // }

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} {...outerProps}>
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
                console.log({ r })
                r[0].setHours(9, 0, 0, 0)
                r[1].setHours(17, 0, 0, 0)
                // onChange(r)
              }}
              // defaultValue={initialRange}
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
                {/* {Array.isArray(value) && value.at(0) && ( */}
                <>
                  <HStack as={StatNumber}>
                    <Select
                      name="start"
                      variant="unstyled"
                      defaultValue={900}
                      fontWeight="semibold"
                      fontSize="2xl"
                      // onChange={timeChange}
                    >
                      {/* {timeRange9_17().map((t, ii) => (
                          <option key={ii} value={t}>
                            {t}
                          </option>
                        ))} */}
                    </Select>
                    {/* {value.at(0) && <Text>{`${format(value.at(0), "EEEE")}`}</Text>} */}
                  </HStack>
                  {/* <StatHelpText>{formatDistance(value.at(0), new Date())}</StatHelpText> */}
                </>
                {/* )} */}
              </Stat>
            </Box>
            {/* <Spacer /> */}
            <Box alignSelf="center">
              <Stat>
                {/* {Array.isArray(value) && value.at(0) && (
                  <Text as={StatNumber}>{`${format(value.at(0), "do MMM")}`}</Text>
                )} */}
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
                {/* {Array.isArray(value) && value.at(1) && ( */}
                <>
                  <HStack as={StatNumber}>
                    <Select
                      name="end"
                      variant="unstyled"
                      defaultValue={1700}
                      fontWeight="semibold"
                      fontSize="2xl"
                      // onChange={timeChange}
                    >
                      {/* {timeRange9_17().map((t, ii) => (
                          <option key={ii} value={t}>
                            {t}
                          </option>
                        ))} */}
                    </Select>
                    {/* <Text>{`${format(value.at(1), "EEEE")}`}</Text> */}
                  </HStack>
                  {/* <StatHelpText>{formatDistance(value.at(1), new Date())}</StatHelpText> */}
                </>
                {/* )} */}
              </Stat>
            </Box>
            {/* <Spacer /> */}
            <Box alignSelf="center">
              <Stat>
                {/* {Array.isArray(value) && value.at(1) && (
                  <Text as={StatNumber}>{`${format(value.at(1), "do MMM")}`}</Text>
                )} */}
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

export default DateFieldUtf
