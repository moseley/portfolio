import * as React from 'react'
import { Blurhash } from 'react-blurhash'
import { Fade } from '@chakra-ui/react'
// import { useBlurHash } from '../../hooks/useBlurHash'

export const BlurHash = ({ hash }: { hash: string }) => {
  return (
    <Fade in={true}>
      <Blurhash
        hash={hash}
        width='100vw'
        height='100vh'
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
    </Fade>
  )
}
