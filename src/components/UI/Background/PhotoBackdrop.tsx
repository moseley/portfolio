import * as React from 'react'
// import { BlurhashCanvas } from 'react-blurhash'
import { useInView } from 'react-intersection-observer'
import { useBlurhash } from '../../hooks/useBlurhash'

const PhotoBackdrop = () => {
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(undefined)
  const [blurhash, setBlurhash] = React.useState<string | null>(null)
  const [imgLoaded, setImgLoaded] = React.useState<boolean>(false)
  const [ref, inView] = useInView({ rootMargin: '110%' })
  const blurUrl = useBlurhash(!imgLoaded && inView ? blurhash : null)

  React.useEffect(() => {
    fetch('/api/photo/query/nature')
      .then((r) => r.json())
      .then((result) => {
        // console.log(result)
        setBlurhash(result[0].blur_hash)
        // setImgSrc(result[0].urls.regular)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleOnLoad = React.useCallback(() => {
    setImgLoaded(true)
  }, [])

  const style = blurUrl
    ? {
        backgroundImage: `url('${blurUrl}')`,
        backgroundSize: '100% 100%'
      }
    : {}

  return (
    <img
      ref={ref}
      src={imgSrc}
      loading='lazy'
      onLoad={handleOnLoad}
      style={style}
    />
  )
}

export default PhotoBackdrop
