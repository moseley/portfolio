import { Box, BoxProps, useColorMode } from '@chakra-ui/react'
export const Glass = (props: BoxProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Box
      textAlign='center'
      d='flex'
      flexDirection='column'
      alignContent='space-between'
      borderRadius='xl'
      borderTopWidth='1px'
      borderTopStyle='solid'
      borderLeftWidth='1px'
      borderLeftStyle='solid'
      borderColor={isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'}
      boxShadow='10px 10px 50px rgba(0,0,0,0.2)'
      style={{
        backdropFilter: 'blur(5px)',
        backgroundImage: isDark
          ? 'linear-gradient(to right bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2))'
          : 'linear-gradient(to right bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.1))'
      }}
      {...props}
    />
  )
}
