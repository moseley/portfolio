import * as React from 'react'
import { Fade, Box, useColorMode, useMediaQuery } from '@chakra-ui/react'

export const Image = () => {
  const [isM] = useMediaQuery('(min-width: 375px)')
  const [isL] = useMediaQuery('(min-width: 750px)')
  const [isXL] = useMediaQuery('(min-width: 1280px)')
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [bgImage, setBgImage] = React.useState<string>(
    '/golden-gate/golden-gate-1x.jpg'
  )
  const [height, setHeight] = React.useState<number>(1000)

  React.useEffect(() => {
    if (isXL) {
      setBgImage('/golden-gate/golden-gate-4x.jpg')
      setHeight(4000)
    } else if (isL) {
      setBgImage('/golden-gate/golden-gate-3x.jpg')
      setHeight(3000)
    } else if (isM) {
      setBgImage('/golden-gate/golden-gate-2x.jpg')
      setHeight(2000)
    }
  }, [isM, isL, isXL])

  return (
    <Fade in={true}>
      <Box
        width='100vw'
        height={`${height}px`}
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
          backgroundImage: `url('${bgImage}')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          position: 'absolute',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          opacity: isDark ? '0.45' : '1'
        }}
      />
    </Fade>
  )
}
