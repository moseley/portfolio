import * as React from 'react'
import { Fade, Flex, FlexProps, useColorMode } from '@chakra-ui/react'
// import { MotionBox } from './MotionBox'
// import { MotionImage } from './MotionImage'
// import { Blurhash } from 'react-blurhash'

interface ImageProps {
  hash: string
  src: string
  width: number
  height: number
}

export const Background = (props: FlexProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const color = { light: 'black', dark: 'white' }
  const [image, setImage] = React.useState<ImageProps>({
    hash: '',
    src: '',
    width: 0,
    height: 0
  })
  const [loaded, setLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    setImage({
      hash: 'LzJbmqD$s:WE%%t8WAayNJxuWXj[',
      src:
        'https://images.unsplash.com/photo-1613238275495-e413b364d878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDY2MTF8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
      width: 1080,
      height: 720
    })
  }, [])

  React.useEffect(() => {
    if (loaded) {
      console.log('image has been loaded')
    }
  }, [loaded])

  return (
    <Fade in={true}>
      <Flex
        width='100vw'
        height='100vh'
        position='relative'
        bgImage={`url('${image.src}')`}
        bgSize='cover'
        bgPosition='center'
        bgRepeat='no-repeat'
        bgAttachment='fixed'
        onLoad={() => setLoaded}
        {...props}
      />
    </Fade>
    // <img
    //   src={image.src}
    //   width={image.width}
    //   height={image.height}
    //   onLoad={() => setLoaded(true)}
    //   style={{
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     margin: 'auto',
    //     minWidth: '100%',
    //     minHeight: '100%',
    //     zIndex: 2
    //   }}
    // />
  )

  // return (
  //   <Box
  //     w='100vw'
  //     h='100vh'
  //     _before={{
  //       content: `''`,
  //       backgroundImage: `url('${image.src}')`,
  //       backgroundSize: 'cover',
  //       backgroundPosition: 'center',
  //       backgroundRepeat: 'no-repeat',
  //       backgroundAttachment: 'fixed'
  //     }}
  //     bgGradient={
  //       isDark
  //         ? 'linear(to-tr, #4b1e2e, #481c32, #441b37, #3e1c3d, #361d42, #2b2448, #1d2a4b, #002e4c, #00364c, #003e4c, #00454c, #1d4b4b)'
  //         : 'linear(to-tr, #fa6699, #f25fa9, #e45cba, #d15dcb, #b661dc, #9079f1, #608cfc, #009bff, #00b6ff, #00cfff, #00e6ff, #62fbfc)'
  //     }
  // position: 'absolute',
  //     top: '0px',
  //     right: '0px',
  //     bottom: '0px',
  //     left: '0px',
  //     opacity: isDark ? '0.15' : '0.35'
  //     color={color[colorMode]}
  //     {...props}
  //   />
  // )

  // return (
  //   <Box
  //     width='100%'
  //     height='100%'
  //     position='relative'
  //     overflow='hidden'
  //     {...props}>
  //     {image.hash && (
  //       <Fade in={true}>
  //         <Blurhash
  //           hash={image.hash}
  //           width={image.width}
  //           height={image.height}
  //           punch={1}
  //           style={{
  //             position: 'absolute',
  //             top: 0,
  //             left: 0,
  //             right: 0,
  //             bottom: 0,
  //             margin: 'auto',
  //             minWidth: '100%',
  //             minHeight: '100%',
  //             zIndex: 1,
  //             overflow: 'hidden'
  //           }}
  //         />
  //       </Fade>
  //     )}
  //     {image.src && (
  //       <img
  //         src={image.src}
  //         width={image.width}
  //         height={image.height}
  //         onLoad={() => setLoaded(true)}
  //         style={{
  //           position: 'absolute',
  //           top: 0,
  //           left: 0,
  //           right: 0,
  //           bottom: 0,
  //           margin: 'auto',
  //           minWidth: '100%',
  //           minHeight: '100%',
  //           zIndex: 2
  //         }}
  //       />
  //     )}
  //   </Box>
  // )
}
