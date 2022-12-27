import Link from "next/link"
import { useState } from "react"
import Search from "../inputs/Search"
import IndexMenu from "../menus/IndexMenu"
import Menu from "../menus/Menu"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleNavbar = () => setIsOpen(!isOpen)

  return (
    <>
      <div className="absolute w-full flex flex-wrap items-center justify-between px-2 py-1 navbar-expand-lg bg-white shadow">
        <div className="w-full px-2 mx-auto flex flex-wrap items-center justify-between">
          <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <div
                className="cursor-pointer text-slate-700 text-sm font-bold leading-relaxed inline-block mr-4 py-1 whitespace-nowrap uppercase"
                id="#home"
              >
                abst
              </div>
            </Link>

            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={toggleNavbar}
            >
              <i className="fas fa-bars" />
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (isOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Search name="customer-search" />
              </li>
              <li className="flex items-center">
                <Link
                  className="hover:text-slate-500 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="cursor-pointer text-slate-700 text-sm font-bold leading-relaxed inline-block mr-4 py-1 whitespace-nowrap">
                    <i className="text-slate-600 far fa-file-alt text-lg leading-lg mr-2" />
                    Docs
                  </div>
                </Link>
              </li>
            </ul>

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <IndexMenu />
              </li>
              <li className="flex items-center">
                <Menu />
              </li>
              <li className="flex items-center">
                <Link
                  className="hover:text-slate-500 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <>
                    <i className="cursor-pointer text-slate-400 fab fa-facebook text-lg leading-lg" />
                    <span className="lg:hidden inline-block ml-2">Share</span>
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

export default Header
