import { Heading, Text, Box, Button, Link, Image } from '@chakra-ui/react'
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
  return (
    <Glass p='1rem'>
      {img && (
        <Box mb={4}>
          <Link href={url} isExternal>
            <Image src={`/projects/${img}`} alt={title} borderTopRadius='xl' />
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
                leftIcon={<BiLinkExternal color='black' size='1em' />}>
                Visit
              </Button>
            </Link>
          </Box>
        )}
        <Box p={2}>
          <Link href={src} isExternal>
            <Button size='sm' leftIcon={<SiGithub color='black' size='1em' />}>
              Source Code
            </Button>
          </Link>
        </Box>
      </Box>
    </Glass>
  )
}
