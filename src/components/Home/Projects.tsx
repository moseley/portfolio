import { Heading, Text, SimpleGrid, Link, Button, ButtonGroup, IconButton, useColorMode } from '@chakra-ui/react'
import { SiGithub } from 'react-icons/si'
import { MotionBox } from '../UI/MotionBox'
import { Glass } from '../UI/Glass'
import NextLink from 'next/link'

const projects = [
  { title: 'Cryptocurrency Blockchain Simplified', summary: 'Learn how blockchains work! A quick example with JS', route: '/', img: '', src: '' },
  { title: 'NFL Tournament Bracket', summary: 'Having fun with flexbox layouts.', route: '/projects/bracket', img: '', src: '' },
  { title: 'Monte Hall Game Theory', summary: 'Learn the math behind the gameshow.', route: '/projects/montehall', img: '', src: '' }
]

const Projects = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <>
      <Heading fontSize='2xl' mt='2rem'>Samples</Heading>
      <SimpleGrid columns={3} spacing='1.5rem' py='2rem'>
        {projects.map(project => {
          return (
            <MotionBox whileHover={{
              scale: 1.05,
              transition: {
                ease: 'easeOut',
                duration: .4
              }
            }}>
              <Glass p='1rem'>
                <Heading fontSize='lg'>{project.title}</Heading>
                <Text fontSize='sm' py='1rem'>{project.summary}</Text>
                <ButtonGroup size='xs' isAttached variant='solid' colorScheme={isDark ? 'blackAlpha' : 'whiteAlpha'}>
                  <NextLink href={project.route} passHref>
                    <Button mr='-px' passHref>View</Button>
                  </NextLink>
                  <Link href={project.src} isExternal as={IconButton} aria-label='View Source Code' icon={<SiGithub />} />
                </ButtonGroup>
              </Glass>
            </MotionBox>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export default Projects