import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { Glass } from './Glass'
import { Image } from './Image'

const Background = () => {
  return (
    <Box position='fixed' top='0' left='0' width='100%' height='100%'>
      <Image />
    </Box>
  )
}

export { Glass }

export default Background
