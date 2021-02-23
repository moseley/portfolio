import * as React from 'react'
import { Fade, Box, BoxProps, Text, Link, useColorMode } from '@chakra-ui/react'
import axios from 'axios'

interface PhotoProps {
  hash: string
  src: string
  width: number
  height: number
  username: string
  name: string
}

export const Photo = (props: BoxProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [img, setImg] = React.useState<PhotoProps | null>(null)

  React.useEffect(() => {
    const fetchPhoto = async () => {
      const { data } = await axios.get<PhotoProps>('/api/photo/cache')
      setImg(data)
    }
    fetchPhoto()
  }, [])

  return (
    <Box
      position='fixed'
      top='0'
      left='0'
      width='100%'
      height='100%'
      {...props}>
      <Fade in={true}>
        {img && (
          <Box
            position='absolute'
            width='100%'
            height='100%'
            zIndex={1}
            top={0}
            left={0}
            bgImage={`url('${img.src}')`}
            bgSize='cover'
            bgPosition='center'
            bgRepeat='no-repeat'
            {...props}>
            <Box
              position='absolute'
              zIndex={2}
              left={0}
              bottom={0}
              width='100%'
              height='50px'>
              <Text
                align='center'
                fontStyle='italic'
                textShadow={
                  isDark
                    ? '2px 2px 5px rgba(0,0,0,0.3)'
                    : '1px 1px 5px rgba(255,255,255,0.6)'
                }>
                Photo by{' '}
                <Link
                  href={`https://unsplash.com/${img.username}?utm_source=jmoseley&utm_medium=referral&utm_campaign=api-credit`}
                  textDecoration='underline'>
                  {img.name}
                </Link>{' '}
                on{' '}
                <Link
                  href={`https://unsplash.com/?utm_source=jmoseley&utm_medium=referral&utm_campaign=api-credit`}
                  textDecoration='underline'>
                  Unsplash
                </Link>
              </Text>
            </Box>
          </Box>
        )}
      </Fade>
    </Box>
  )
}
