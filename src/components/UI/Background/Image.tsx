import * as React from 'react'
import { Fade, Box, useColorMode } from '@chakra-ui/react'

export const Image = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Fade in={true}>
      <Box
        width='100vw'
        height='100vh'
        // bg={
        //   'url(/golden-gate/golden-gate-4x.jpg) no-repeat center center fixed'
        // }
        // bgSize='cover'
        bgGradient={
          isDark
            ? 'linear(to-tr, #4b1e2e, #481c32, #441b37, #3e1c3d, #361d42, #2b2448, #1d2a4b, #002e4c, #00364c, #003e4c, #00454c, #1d4b4b)'
            : undefined
        }
        zIndex={1}
        _before={{
          content: `''`,
          backgroundImage: "url('/golden-gate/golden-gate-4x.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          position: 'absolute',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          opacity: isDark ? '0.15' : '1'
        }}
      />
    </Fade>
  )
}
