import { BlitzPage } from "@blitzjs/next"
import { Box, Flex } from "@chakra-ui/react"
import { job } from "app/stashes/validations"
import { useState } from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"

const ChartTest: BlitzPage = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const [options, setOptions] = useState({
    indexAxis: "y" as const,
    elements: { bar: { borderWidth: 1 } },
    responsive: true,
    plugins: {
      legend: { position: "right" as const },
      title: {
        display: true,
        text: "Chart.js Horizontal bar chart",
      },
    },
  })

  const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const data = {
    dayLabels,
    datasets: [
      {
        label: "PO",
        data: job.end.getDay - job.start.getDay,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return (
    <Flex p={4}>
      <Box borderColor="blackAlpha.200" borderWidth={1} borderRadius="md" p={3} boxShadow="lg">
        Chart testing
      </Box>
      <Bar options={options} data={data} />
    </Flex>
  )
}

export default ChartTest
