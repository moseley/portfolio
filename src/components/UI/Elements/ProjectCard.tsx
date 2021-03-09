import * as React from 'react'
import {
  Heading,
  Text,
  Box,
  Button,
  Link,
  Image,
  useColorMode
} from '@chakra-ui/react'
import { SiGithub } from 'react-icons/si'
import { Glass } from '@components/UI/Background/Glass'
import { BiLinkExternal } from 'react-icons/bi'

export interface ProjectProps {
  title: string
  summary: string
  img?: string
  url: string
  src: string
}

export const ProjectCard = ({
  title,
  summary,
  img,
  url,
  src
}: ProjectProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [sourceImage, setSourceImage] = React.useState<string | undefined>()
  const [sourceSet, setSourceSet] = React.useState<string | undefined>()

  React.useEffect(() => {
    if (img) {
      const [imgName, ext] = img.split('.')
      setSourceImage(`projects/${imgName}-1x.${ext}`)
      setSourceSet(
        `projects/${imgName}-1x.${ext} 345w, projects/${imgName}-2x.${ext} 690w, projects/${imgName}-3x.${ext} 1035w, projects/${imgName}-4x.${ext} 1380w`
      )
    }
  }, [img])

  return (
    <Glass p='1rem'>
      {img && (
        <Box mb={4}>
          <Link href={url} isExternal>
            <Image
              src={sourceImage}
              srcSet={sourceSet}
              sizes='(min-width: 800px) 50vw, 100vw'
              htmlWidth={1380}
              htmlHeight={500}
              alt={title}
              borderTopRadius='xl'
            />
          </Link>
        </Box>
      )}
      <Heading fontSize='lg'>{title}</Heading>
      <Text fontSize='sm' py='1rem'>
        {summary}
      </Text>
      <Box d='flex' spacing='0.5rem' flexWrap='nowrap' justifyContent='center'>
        {url && (
          <Box p={2}>
            <Link href={url} isExternal>
              <Button
                size='sm'
                leftIcon={
                  <BiLinkExternal
                    color={isDark ? 'white' : 'black'}
                    size='1em'
                  />
                }>
                Visit
              </Button>
            </Link>
          </Box>
        )}
        <Box p={2}>
          <Link href={src} isExternal>
            <Button
              size='sm'
              leftIcon={
                <SiGithub color={isDark ? 'white' : 'black'} size='1em' />
              }>
              Source Code
            </Button>
          </Link>
        </Box>
      </Box>
    </Glass>
  )
}
