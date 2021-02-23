import * as React from 'react'
import { decode } from 'blurhash'

interface Props {
  blurhash: string | undefined | null
  width?: number
  height?: number
  punch?: number
}

const useBlurHash = ({
  blurhash,
  width = 32,
  height = 32,
  punch = 1
}: Props): string | null => {
  const [url, setUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    let isCancelled = false

    if (!blurhash) return

    // decode hash
    const pixels = decode(blurhash, width, height, punch)

    // temporary canvas to create a blob from decoded ImageData
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    const imageData = context!.createImageData(width, height)
    imageData.data.set(pixels)
    context!.putImageData(imageData, 0, 0)
    canvas.toBlob((blob) => {
      if (!isCancelled) {
        setUrl((oldUrl) => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl)
          }
          return URL.createObjectURL(blob)
        })
      }
    })

    return function cleanupBlurhash() {
      isCancelled = true
      setUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl)
        }
        return null
      })
    }
  }, [blurhash, width, height, punch])

  return url
}

export { useBlurHash }
