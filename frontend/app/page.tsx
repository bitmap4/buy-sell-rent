"use client"

import { Flex, Image } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"

export default function Page() {
  const logo = useColorModeValue("/logo-light.svg", "/logo-dark.svg")

  return (
    <Flex 
      height="100vh" 
      justifyContent="center" 
      alignItems="center"
    >
      <Image
        src={logo}
        alt="Logo"
        width={{ base: "150%", md: "full" }}
        height="auto"
      />
    </Flex>
  )
}
