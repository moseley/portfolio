import * as React from 'react'
import { Fade, Box } from '@chakra-ui/react'

export const Image = () => {
  return (
    <Fade in={true}>
      <Box
        width='100vw'
        height='100vh'
        bg={
          'url(/golden-gate/golden-gate-4x.jpg) no-repeat center center fixed'
        }
        bgSize='cover'
      />
    </Fade>
  )
}
