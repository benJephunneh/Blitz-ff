import { createRef, useRef, useState } from "react"
import { createPopper, VirtualElement } from "@popperjs/core"
import { usePopper } from "react-popper"

const IndexMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [btnMenuRef, setBtnMenuRef] = useState<any>(null)
  const [menuRef, setMenuRef] = useState<any>(null)
  const [arrowRef, setArrowRef] = useState<any>(null)
  const { styles, attributes } = usePopper(btnMenuRef, menuRef, {
    modifiers: [{ name: "arrow", options: { element: arrowRef } }],
  })

  const toggleMenu = (e) => {
    e.preventDefault()
    setShowMenu(!showMenu)
  }

  return (
    <>
      <button type="button" ref={setBtnMenuRef} onClick={toggleMenu}>
        Open the menu
      </button>

      {showMenu && (
        <div ref={setMenuRef} style={styles.popper} {...attributes.popper}>
          Menu element
          <div ref={setArrowRef} style={styles.arrow} />
        </div>
      )}
    </>
  )
}

export default IndexMenu
