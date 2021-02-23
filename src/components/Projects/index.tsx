import { Heading, Stack } from '@chakra-ui/react'
import { ProjectCard } from '@components/UI/Elements/ProjectCard'

const projects = [
  {
    title: 'Cryptocurrency Blockchain Simplified',
    summary: 'Learn how blockchains work! A quick example with JS',
    route: '/',
    img: '',
    src: '#'
  },
  {
    title: 'NFL Tournament Bracket',
    summary: 'Having fun with flexbox layouts.',
    route: '/projects/bracket',
    img: '',
    src: '#'
  },
  {
    title: 'Monte Hall Game Theory',
    summary: 'Learn the math behind the gameshow.',
    route: '/projects/monte-hall',
    img: '',
    src: '#'
  }
]

const Projects = () => {
  return (
    <>
      <Heading fontSize='2xl' mt='2rem'>
        Project Samples
      </Heading>
      <Stack columns={3} spacing='1.5rem' py='2rem'>
        {projects.map((project) => (
          <ProjectCard key={project.route} {...project} />
        ))}
      </Stack>
    </>
  )
}

export default Projects
