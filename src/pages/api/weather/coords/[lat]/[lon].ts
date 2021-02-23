import type { NextApiRequest, NextApiResponse } from 'next'

const apiKey = process.env.OPENWEATHERMAP_API_KEY

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { lat, lon }
    } = req
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
      })
  } catch (error) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error))
  }
}
