import * as React from 'react'
import { Blurhash } from 'react-blurhash'
// import { useBlurHash } from '../../hooks/useBlurHash'

export const BlurHash = ({ blurhash }: { blurhash: string }) => {
  return <Blurhash hash={blurhash} width='100%' height='100%' />
}
