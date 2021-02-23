import * as React from 'react'
import { Fade, Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react'

interface ImgProps {
  hash: string
  src: string
  width: number
  height: number
}

const Photo = (props: BoxProps) => {
  const [img, setImg] = React.useState<ImgProps | null>(null)

  React.useEffect(() => {
    fetch('/api/photo/cache')
      .then((r) => r.json())
      .then((i) => setImg(i))
      .catch((e) => console.log(e))
  }, [])

  return !img ? null : (
    <Box d='block' position='relative' width='100%' height='100%' zIndex={0}>
      <Fade in={true}>
        <Box
          position='absolute'
          width='100%'
          height='100%'
          zIndex={1}
          top={0}
          left={0}
          // position='relative'
          bgImage={`url('${img.src}')`}
          bgSize='cover'
          bgPosition='center center'
          bgRepeat='no-repeat'
          bgAttachment='fixed'
          {...props}
        />
      </Fade>
    </Box>
  )
}

export default Photo
