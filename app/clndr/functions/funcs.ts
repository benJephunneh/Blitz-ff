import { getDay, getDaysInMonth, startOfDay } from "date-fns"

export const getDatesInMonth = (date) => {
  let firstDayOfMonth = new Date(date)
  firstDayOfMonth.setDate(1)
  let weekIndex = 0

  return Array.from({ length: getDaysInMonth(date) }).map((_, dayIndex) => {
    let date = new Date(firstDayOfMonth)
    let dayOfMonth = date.getDate() + dayIndex
    date.setDate(dayOfMonth)

    let weekdayIndex = getDay(date)
    if (weekdayIndex === 0) weekIndex += 1

    return {
      dayOfMonth,
      weekdayIndex:
        weekdayIndex === 0
          ? // Makes Monday the first day of the week
            6
          : weekdayIndex - 1,
      weekIndex:
        weekdayIndex === 0 && weekIndex > 0
          ? weekIndex - 1 // Put Sunday on the previous week
          : weekIndex,
      date,
    }
  })
}

export const getDaysInWeek = (days) =>
  Array.from({
    length: 7, // Seven days in a week
  }).map((_, ii) => {
    const dayInMonth = days.find(({ weekdayIndex }) => weekdayIndex === ii)
    return dayInMonth ? dayInMonth : {}
  })

export const sortDatesByWeeksNo = (days) => {
  const numberOfWeeks = days.reduce((n, day, ii) => {
    let prevDay = days[ii - 1]
    if (prevDay) {
      let sameWeek = prevDay.weekIndex === day.weekIndex
      if (!sameWeek) return n + 1
    }

    return n
  }, 1)

  return Array.from(Array(numberOfWeeks).keys()).map((weekNo) =>
    getDaysInWeek(days.filter(({ weekIndex }) => weekIndex === weekNo))
  )
}

export const getDatesByWeekNo = (date) => sortDatesByWeeksNo(getDatesInMonth(date))
