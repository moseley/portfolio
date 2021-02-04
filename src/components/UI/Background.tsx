import { Flex, FlexProps, useColorMode } from '@chakra-ui/react'
export const Background = (props: FlexProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const color = { light: 'black', dark: 'white' }
  return (
    <Flex
      width='100vw'
      height='100vh'
      position='relative'
      bgGradient={
        isDark
          ? 'linear(to-tr, #4b1e2e, #481c32, #441b37, #3e1c3d, #361d42, #2b2448, #1d2a4b, #002e4c, #00364c, #003e4c, #00454c, #1d4b4b)'
          : 'linear(to-tr, #fa6699, #f25fa9, #e45cba, #d15dcb, #b661dc, #9079f1, #608cfc, #009bff, #00b6ff, #00cfff, #00e6ff, #62fbfc)'
      }
      zIndex={1}
      _before={{
        content: `''`,
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/e/e5/Silicon_Valley%2C_facing_southward_towards_Downtown_San_Jose%2C_2014.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        opacity: isDark ? '0.15' : '0.35'
      }}
      direction='column'
      alignItems='center'
      justifyContent='flex-start'
      color={color[colorMode]}
      // borderRadius='xl'
      // border='3px'
      // borderColor='rgba(255,255,255,1)'
      // mt='4rem'
      // style={{
      //   backdropFilter: 'blur(5px)',
      //   backgroundImage: isDark
      //     ? 'linear-gradient(to right bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2))'
      //     : 'linear-gradient(to right bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.1))'
      // }}
      {...props}
    />
  )
}
