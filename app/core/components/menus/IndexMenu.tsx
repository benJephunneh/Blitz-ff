import { createPopper } from "@popperjs/core"
import { createRef, useState } from "react"

const IndexMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const btnMenuRef = createRef()
  const menuRef = createRef()

  const toggleMenu = () => {
    if (!showMenu) {
      createPopper(btnMenuRef.current, menuRef.current, {
        placement: "bottom-start",
      })
    }
    setShowMenu(!showMenu)
  }

  return (
    <>
      <p>asdf</p>
    </>
  )
}

export default IndexMenu
