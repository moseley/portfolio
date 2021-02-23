import { Heading, Text, Box, Button, useColorMode } from '@chakra-ui/react'
import { SiGithub } from 'react-icons/si'
import { MotionBox } from '@components/UI/Elements/MotionBox'
import { Glass } from '@components/UI/Background/Glass'
import NextLink from 'next/link'

interface ProjectProps {
  title: string
  summary: string
  route: string
  img?: string
  src?: string
}

export const ProjectCard = ({ title, summary, route, src }: ProjectProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    // <MotionBox
    //   key={title}
    //   whileHover={{
    //     scale: 1.02,
    //     transition: {
    //       ease: 'easeOut',
    //       duration: 0.2
    //     }
    //   }}>
    <Glass p='1rem'>
      <Heading fontSize='lg'>{title}</Heading>
      <Text fontSize='sm' py='1rem'>
        {summary}
      </Text>
      <Box d='flex' spacing='0.5rem' flexWrap='nowrap' justifyContent='center'>
        {route && (
          <Box p={2}>
            <NextLink href={route}>
              <Button size='sm'>View</Button>
            </NextLink>
          </Box>
        )}
        {src && (
          <Box p={2}>
            <NextLink href={src}>
              <Button
                size='sm'
                leftIcon={<SiGithub color='black' size='1em' />}>
                Source Code
              </Button>
            </NextLink>
          </Box>
        )}
      </Box>
    </Glass>
    // </MotionBox>
  )
}
