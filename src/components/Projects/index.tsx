import { Heading, Stack } from '@chakra-ui/react'
import { ProjectCard, ProjectProps } from '@components/UI/Elements/ProjectCard'

const projects: ProjectProps[] = [
  {
    title: 'Flexbox Brackets',
    summary:
      'A fun use of flexbox to display columns of games. Built using React, Material UI, and Redux. Written in TypeScript.',
    img: 'bracket/bracket.jpg',
    url: 'https://bracket-challenge.netlify.com',
    src: 'https://github.com/moseley/bracket'
  }
]

const Projects = () => {
  return (
    <>
      <Heading fontSize='2xl' mt='2rem'>
        Project Showcase
      </Heading>
      <Stack columns={3} spacing='1.5rem' py='2rem'>
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </Stack>
    </>
  )
}

export default Projects
