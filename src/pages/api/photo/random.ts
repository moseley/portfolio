import type { NextApiRequest, NextApiResponse } from 'next'
import { setHeaders } from '@utils/response'
import axios from 'axios'

const apiKey = process.env.UNSPLASH_ACCESS_KEY

interface UnsplashProps {
  data: Array<any>
  [key: string]: any
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const end = setHeaders(req, res)
  if (end) {
    return
  }
  try {
    const data: UnsplashProps = await axios.get(
      `https://api.unsplash.com/photos/random?count=1&orientation=landscape&featured=true&client_id=${apiKey}`
    )
    const [img] = data.data
    res.status(200).json(
      JSON.stringify({
        hash: img.blur_hash,
        src: img.urls.regular,
        width: 1080,
        height: Math.floor((img.height * 1080) / img.width)
      })
    )
  } catch (e) {
    res.status(400).json(JSON.stringify(e))
  }
}
