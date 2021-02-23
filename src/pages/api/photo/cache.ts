import type { NextApiRequest, NextApiResponse } from 'next'
import { setHeaders } from '@utils/response'

const images = [
  {
    hash: 'LcFF]pxabdR:0qRjogog$ws+WAWB',
    src:
      'https://images.unsplash.com/photo-1613051499513-3d2b6ba0dd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDY2MTF8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
    width: 1080,
    height: 810,
    username: '@benoit1974',
    name: 'Benoit Debaix'
  },
  {
    hash: 'LWJQ+g9vkBNI~9I;j[WV9vayoJjs',
    src:
      'https://images.unsplash.com/photo-1607291037884-22084eb29ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDY2MTF8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
    width: 1080,
    height: 718,
    username: '@agoody',
    name: 'Eduardo Goody'
  },
  {
    hash: 'LdF6RjXURPxZY8tSRjs:I^bvjER.',
    src:
      'https://images.unsplash.com/photo-1605592742863-a117de0a6142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDY2MTF8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
    width: 1080,
    height: 720,
    username: '@kcwelch330',
    name: 'KC Welch'
  },
  {
    hash: 'LDB|d5oeIUogSiRjj?j[01WEj?j@',
    src:
      'https://images.unsplash.com/photo-1611878297584-9ca4ca69bd86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDY2MTF8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
    width: 1080,
    height: 719,
    username: '@earl_compass',
    name: 'Earl Wilcox'
  }
]

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const end = setHeaders(req, res)
  if (end) {
    return
  }
  const i = Math.floor(Math.random() * images.length)
  const img = images[i]
  res.status(200).json(img)
}
