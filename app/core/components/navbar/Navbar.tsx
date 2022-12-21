import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, toggleNavbar] = useState(false)

  return (
    <>
      <div className="top-0 fixed z-50 w-screen flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-screen relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <div
                className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                id="#pablo"
              >
                ABST
              </div>
            </Link>

            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => toggleNavbar(!isOpen)}
            >
              <i className="fas fa-bars" />
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center bg-white lg: bg-opacity-0 lg:shadow-none" + isOpen
                ? " block"
                : " hidden"
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <>
                    <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" /> Docs
                  </>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
