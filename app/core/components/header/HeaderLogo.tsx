import { Routes } from "@blitzjs/next"
import { Heading, HStack } from "@chakra-ui/react"
import Link from "next/link"
import LogoIcon from "../LogoIcon"
import PageTitle from "../PageTitle"

const HeaderLogo = () => {
  return (
    <Link href={Routes.Home()} passHref>
      <LogoIcon height={20} width={20} alt="ABST icon" />
    </Link>
  )
}

export default HeaderLogo
