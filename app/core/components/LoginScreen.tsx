import Image from "next/image"
import Link from "next/link"

type LoginScreenProps = {
  isLoggedOut: boolean
  isLoggingIn: boolean
  bgImage: string
}
const LoginScreen = ({ isLoggedOut, isLoggingIn, bgImage }) => {
  return (
    <div
      style={isLoggedOut || isLoggingIn ? { zIndex: "100" } : { zIndex: "-20 " }}
      className={
        (isLoggedOut || isLoggingIn ? " visible opacity-100" : " invisible opacity-0") +
        " absolute duration-500 select-none flex flex-col justify-around items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-black"
      }
    >
      <Image width="400px" src="./public/abst_logo.png" aria-label="Company logo" />
      <div
        className="w-10 h-10 flex justify-center items-center rounded-full outline-none cursor-pointer"
        // onClick={logIn}
      >
        {isLoggedOut ? (
          <div className="bg-white rounded-full flex justify-center items-center w-10 h-10 hover:bg-gray-300">
            <Image
              width="32px"
              height="32px"
              className="w-8"
              src="./public/images/power-button.svg"
              alt="Power button"
            />
          </div>
        ) : (
          <Image
            width="40px"
            height="40px"
            className={" w-10" + (isLoggingIn ? " animate-spin " : "")}
            src="./images/process-working-symbolic.png"
            alt="Logging in symbol"
          />
        )}
      </div>
      <Link href="https://www.apalacheeseptic.com" rel="noreferrer noopener" target="_blank">
        apalachee septic
      </Link>
      <span className="font-bold mx-1">|</span>
      <Link
        href="https://www.github.com/benJephunneh/Blitz-ff"
        rel="noreferrer noopener"
        target="_blank"
      >
        github
      </Link>
    </div>
  )
}

export default LoginScreen
