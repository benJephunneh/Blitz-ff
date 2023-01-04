import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Box, Container, Flex } from "@chakra-ui/react"
import { Job } from "@prisma/client"
import getJobs from "app/jobs/queries/getJobs"
import getLocations from "app/locations/queries/getLocations"
import { job } from "app/stashes/validations"
import { getDay, getDayOfYear, isAfter, previousDay, previousMonday, subDays } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    date: "2023-01",
    uv: 17,
    pv: 12,
    // amt: 9,
  },
  {
    date: "2023-02",
    uv: 17,
    pv: 9,
    amt: 9,
  },
  {
    date: "2023-03",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-04",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-05",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-06",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-07",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-08",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-09",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-10",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-11",
    uv: 17,
    pv: 17,
    amt: 9,
  },
  {
    date: "2023-12",
    uv: 17,
    pv: 17,
    amt: 9,
  },
]

const monthTickFormatter = (t: string) => {
  const date = new Date(t)

  return (date.getMonth() + 1).toString()
}

const renderQuarterTick = (tickProps: any) => {
  const { x, y, payload } = tickProps
  const { value, offset } = payload
  const date = new Date(value)
  const month = date.getMonth()
  const quarterNo = Math.floor(month / 3) + 1

  const isLast = month === 11
  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5

    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />
  }

  return null
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box borderRadius="md" border="1px solid gray" bg="white" p={1}>
        <p>{`${label} : ${payload[0].value}`}</p>
        <p>PO: 1093 Corby Ct</p>
      </Box>
    )
  }

  return null
}

const ChartTest: BlitzPage = () => {
  const [today, setToday] = useState<Date>(subDays(new Date(), 1))
  useEffect(() => {
    setToday(new Date())
  }, [])
  const [viewRange, setViewRange] = useState([previousMonday(today), today] as const)
  const [jobs, { refetch }] = useQuery(
    getJobs,
    {
      where: {
        AND: [{ start: { gte: viewRange[0] } }, { end: { lte: viewRange[1] } }],
      },
    },
    {
      enabled: viewRange[0] !== undefined,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )

  const [locations, { refetch: refetchLocations }] = useQuery(getLocations, {
    where: { id: [0, 1, 2] },
  })
  // Create calendar instance so user can set viewRange.

  const data = (jobs: Job[]) => {
    return jobs.reduce((acc, job) => {})
  }

  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  return (
    <Flex p={4} boxShadow="2xl" maxW="fit-content">
      {/* <ResponsiveContainer width='100%' height='100%'> */}
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={renderQuarterTick}
          height={1}
          scale="band"
          xAxisId="quarter"
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="pv" fill="#4884d8" />
        <Bar dataKey="uv" fill="#48b0a8" />
      </BarChart>
    </Flex>
  )
}

export default ChartTest
