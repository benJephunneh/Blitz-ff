import { Icon, IconProps, useColorModeValue } from "@chakra-ui/react"
import Image, { ImageProps } from "next/image"
import abstIcon from "public/abst icon.ico"
import { IconType } from "react-icons"
import { FcExpand } from "react-icons/fc"

type LogoIconProps = {
  height: ImageProps["height"]
  width: ImageProps["width"]
  alt: ImageProps["alt"]
}
const LogoIcon = ({ height, width, alt }: LogoIconProps) => {
  const fg = useColorModeValue("white", "#2d3748")
  const bg = useColorModeValue("#2d3748", "white")

  return <Image src={abstIcon} height={height} width={width} alt={alt} />
}

export default LogoIcon
