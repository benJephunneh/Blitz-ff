import { createContext } from "react"

type DragAndDropListItem = {
  id: number
  quantity: number
  lineitem: {
    name: string
    totalCost: number
    link: string | null
    // notes: string | null
  }
}

export type DragAndDropJob = {
  jobId: number
  title: string
  lineitems: DragAndDropListItem[]
}

type DragAndDropListItemContext = {
  readonly?: boolean
  state: DragAndDropJob

  addListItemToJob?: () => void
  editJobList?: () => void

  // jobListMenu?: (item: ) => JSX.Element
  // itemMenu?: () => void
  editItem?: (id: number) => void
}

const dragAndDropListItemContext = createContext<DragAndDropListItemContext>(
  {} as DragAndDropListItemContext
)
export default dragAndDropListItemContext
