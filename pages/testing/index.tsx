import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
// import getLineItems from "app/lineitems/queries/getLineItems"
import { useEffect, useState } from "react"
// import Subheader from "./Subheader"
import { LineItem } from "@prisma/client"
// import getLineItem from "app/lineitems/queries/getLineItem"

const Testing: BlitzPage = () => {
  // const [lineitemsSource] = useQuery(
  //   getLineItems,
  //   { orderBy: { id: "asc" } },
  //   { refetchOnWindowFocus: false }
  // )
  // const [lineitemsJob, setLineitems2] = useState<LineItem[]>([])

  // const onAdd = (liId: number) => {
  //   const idx = lineitemsJob.findIndex(({ id }) => id == liId)
  //   // console.log({ idx })

  //   if (lineitemsJob.findIndex(({ id }) => id === liId) !== -1) return

  //   const adding = lineitemsSource.find(({ id }) => id === liId)
  //   if (adding) setLineitems2([...lineitemsJob, adding])
  // }

  // const onDelete = (lineitemId: number) => {
  //   const idx = lineitemsJob.findIndex(({ id }) => id === lineitemId)
  //   lineitemsJob.splice(idx, 1)
  //   setLineitems2([...lineitemsJob])
  // }

  // const onDragEnd = async ({ destination, source, draggableId }) => {
  //   if (!destination) return
  //   const start = source.droppableId
  //   const end = destination.droppableId
  //   const sortOrder = [...lineitemsJob.map(({ id }) => id)]
  //   // console.log(source, destination, draggableId)

  //   if (start === end) {
  //     if (source.index === destination.index) return
  //     if (start === "lineitem-list1") return

  //     // const newLineitems = Array.from(lis)
  //     const spliced = sortOrder.splice(source.index, 1)
  //     sortOrder.splice(destination.index, 0, spliced.at(0)!)
  //     setLineitems2(
  //       lineitemsJob.sort((a, b) => {
  //         return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id)
  //       })
  //     )

  //     // console.log(sortOrder, { ...lineitemsJob })
  //     return
  //   } else {
  //     if (lineitemsJob.findIndex(({ id }) => id == draggableId) !== -1) return

  //     const moving = lineitemsSource.find(({ id }) => id == draggableId)
  //     // const sortOrder = [...lineitems2.map(({ id }) => id)]
  //     const tempLineitems = lineitemsJob
  //     tempLineitems.splice(destination.index, 0, moving!)
  //     setLineitems2(tempLineitems)

  //     return
  //   }

  // const moveUnit = lineitems1.find(({ id }) => id == draggableId)
  // console.log(draggableId)
  // console.log({ moveUnit })

  // const newLineitems = Array.from(lis)
  // // const spliced = newLineitems.splice(source.index, 1)
  // // console.log({ ...spliced })
  // newLineitems.splice(destination.index, 0, moveUnit!)

  // setLis(newLineitems)
  // console.log({ newLineitems })
  // }

  // console.log({ lis })

  return (
    <div>
      <p>See console for log.</p>
    </div>
  )
}

// Testing.getLayout = (page) => <TestLayout subheader={<Subheader />}>{page}</TestLayout>
export default Testing
