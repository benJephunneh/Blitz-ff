import { BlitzPage } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import LoginModalForm from "../forms/LoginModalForm"
import Input from "../inputs/Input"
import MdModal from "../modals/MdModal"
import SmModal from "../modals/SmModal"

const Sidebar: BlitzPage = () => {
  const [collapseShow, setCollapseShow] = useState("hidden")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-2 px-4">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars" />
          </button>

          {/* Brand */}
          <Link href="/">
            <div className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-2 px-0">
              ABST
            </div>
          </Link>

          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">SomeDropdown /{/* <SomeDropdown /> */}</li>
            <li className="inline-block relative">AnotherDropdown /{/* <AnotherDropdown /> */}</li>
          </ul>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <div className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                      ABST
                    </div>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="mb-4 md:min-w-full" />

            {/* Form */}
            <form className="mx-1">
              <div className="mb-3 pt-0">
                <Input placeholder="Search..." name="cutsomer-search" />
                {/* <input
                  type="text"
                  placeholder="Search"
                  className="border-1 px-3 py-2 h-12 border-solid border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded te-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                /> */}
              </div>
            </form>

            {/* Heading */}
            {/* <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin layout pages
            </h6> */}

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/" passHref>
                  <div
                    className={
                      "text-xs uppercase cursor-pointer py-3 font-bold block " +
                      (router.pathname.indexOf("/") !== -1
                        ? "text-blue-400 hover:text-blue-500"
                        : "text-slate-500 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-shop mr-2 text-sm " +
                        (router.pathname.indexOf("/") !== -1 ? "opacity-75" : "text-slate-300")
                      }
                    />
                    Home
                  </div>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/customers" passHref>
                  <div
                    className={
                      "text-xs uppercase cursor-pointer py-3 font-bold block " +
                      (router.pathname.indexOf("/customers") !== -1
                        ? "text-blue-400 hover:text-blue-500"
                        : "text-slate-500 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-users mr-2 text-sm " +
                        (router.pathname.indexOf("/customers") !== -1
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    />
                    Customers
                  </div>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/settings" passHref>
                  <div
                    className={
                      "text-xs uppercase cursor-pointer py-3 font-bold block " +
                      (router.pathname.indexOf("/settings") !== -1
                        ? "text-blue-400 hover:text-blue-500"
                        : "text-slate-500 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-gears mr-2 text-sm " +
                        (router.pathname.indexOf("/") !== -1 ? "opacity-75" : "text-slate-300")
                      }
                    />
                    Settings
                  </div>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              User forms
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <button
                  className="text-slate-700 hover:text-slate-500 text-xs uppercase pr-3 py-3 font-bold block cursor-pointer"
                  type="button"
                  onClick={() => setIsOpen(true)}
                >
                  <i className="fas fa-fingerprint text-slate-400 mr-2 text-sm" />
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <MdModal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div>
          {/* <p>This is in the modal.</p> */}
          <LoginModalForm />
        </div>
      </MdModal>
    </>
  )
}

export default Sidebar
