import { ReactNode } from "react"

type LgModalProps = {
  isOpen: boolean
  close: () => void
  children: ReactNode
}

const LgModal = ({ isOpen, close, children }: LgModalProps) => {
  return (
    <div>
      <p>asdf</p>
    </div>
  )
}

export default LgModal
