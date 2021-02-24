import * as React from 'react'
import axios from 'axios'
import { Box } from '@chakra-ui/react'
import { Glass } from './Glass'
import { Photo } from './Photo'
import { BlurHash } from './BlurHash'

interface PhotoProps {
  hash: string
  src: string
  width: number
  height: number
  username: string
  name: string
}

const Background = () => {
  const [img, setImg] = React.useState<PhotoProps | null>(null)

  React.useEffect(() => {
    const fetchPhoto = async () => {
      const { data } = await axios.get<PhotoProps>('/api/photo/cache')
      setImg(data)
    }
    fetchPhoto()
  }, [])

  return (
    <Box position='fixed' top='0' left='0' width='100%' height='100%'>
      {img && <BlurHash hash={img.hash} />}
      {img && <Photo img={img} />}
    </Box>
  )
}

export { Glass, Photo, BlurHash }

export default Background
