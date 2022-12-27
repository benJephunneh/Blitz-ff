import Link from "next/link"
import { useState } from "react"

const Header = () => {
  const [isOpen, toggleNavbar] = useState(false)

  return (
    // <header>
    //   {/* <!-- Navbar --> */}
    //   <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
    //     <div className="px-6 w-full flex flex-wrap items-center justify-between">
    //       <div className="flex items-center">
    //         <button
    //           className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
    //           type="button"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#navbarSupportedContentY"
    //           aria-controls="navbarSupportedContentY"
    //           aria-expanded="false"
    //           aria-label="Toggle navigation"
    //         >
    //           <svg
    //             aria-hidden="true"
    //             focusable="false"
    //             data-prefix="fas"
    //             className="w-5"
    //             role="img"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 448 512"
    //           >
    //             <path
    //               fill="currentColor"
    //               d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
    //             ></path>
    //           </svg>
    //         </button>
    //       </div>
    //       <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
    //         <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
    //           <li className="nav-item">
    //             <Link
    //               className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
    //               href="#!"
    //               data-mdb-ripple="true"
    //               data-mdb-ripple-color="light"
    //             >
    //               Home
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link
    //               className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
    //               href="#!"
    //               data-mdb-ripple="true"
    //               data-mdb-ripple-color="light"
    //             >
    //               Features
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link
    //               className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
    //               href="#!"
    //               data-mdb-ripple="true"
    //               data-mdb-ripple-color="light"
    //             >
    //               Pricing
    //             </Link>
    //           </li>
    //           <li className="nav-item mb-2 lg:mb-0">
    //             <Link
    //               className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
    //               href="#!"
    //               data-mdb-ripple="true"
    //               data-mdb-ripple-color="light"
    //             >
    //               About
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    //   {/* <!-- Navbar --> */}

    //   {/* <!-- Jumbotron --> */}
    //   <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
    //     <h1 className="text-5xl font-bold mt-0 mb-6">Heading</h1>
    //     <h3 className="text-3xl font-bold mb-8">Subeading</h3>
    //     <a
    //       className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    //       data-mdb-ripple="true"
    //       data-mdb-ripple-color="light"
    //       href="#!"
    //       role="button"
    //     >
    //       Get started
    //     </a>
    //   </div>
    //   {/* <!-- Jumbotron --> */}
    // </header>

    <>
      <div className="absolute w-full z-50 flex flex-wrap items-center justify-between px-2 py-1 navbar-expand-lg bg-white shadow">
        <div className="w-full px-2 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-screen relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="nav-link block br-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
            >
              <div
                className="cursor-pointer text-slate-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                id="#home"
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
                  className="nav-link block hover:text-slate-500 text-slate-700 focus:text-slate-700 px-3 py-2 lg:px-2 items-center text-xs uppercase font-bold transition duration-150 ease-in-out"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="cursor-pointer text-slate-700 text-sm font-bold leading-relaxed inline-block mr-4 py-1 whitespace-nowrap">
                    <i className="text-slate-400 far fa-file-alt text-lg leading-lg mr-2" />
                    Docs
                  </div>
                </Link>
              </li>
              {/* <li className="flex items-center">
                <Search name='customer-search' />
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
