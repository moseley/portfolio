import { Flex, FlexProps, useColorMode } from '@chakra-ui/react'

export const Sidebar = (props: FlexProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Flex
      borderTopLeftRadius='xl'
      borderBottomLeftRadius='xl'
      direction='column'
      spacing='1.5rem'
      p='1.5rem'
      maxW='240px'
      style={{
        backdropFilter: 'blur(5px)',
        backgroundImage: isDark
          ? 'linear-gradient(to right bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2))'
          : 'linear-gradient(to right bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.2))'
      }}
      {...props}
    />
  )
}
