import { Box, Link, Button } from '@chakra-ui/react'
import { SiGithub, SiLinkedin, SiAdobeacrobatreader } from 'react-icons/si'

export const PrimaryButtons = () => {
  return (
    <Box d='flex' spacing='0.5rem' flexWrap='nowrap' justifyContent='center'>
      <Box p={2}>
        <Link
          _hover={undefined}
          href='https://github.com/moseley'
          title='Visit GitHub Profile'
          isExternal>
          <Button size='sm' leftIcon={<SiGithub color='black' size='1em' />}>
            GitHub
          </Button>
        </Link>
      </Box>
      <Box p={2}>
        <Link
          _hover={undefined}
          href='https://www.linkedin.com/in/jeremymoseley/'
          title='Visit LinkedIn Profile'
          isExternal>
          <Button size='sm' leftIcon={<SiLinkedin color='blue' size='1em' />}>
            LinkedIn
          </Button>
        </Link>
      </Box>
      <Box p={2}>
        <Link
          _hover={undefined}
          href='https://jeremymoseley.com/JeremyMoseley.pdf'
          title='Download Resume'
          isExternal>
          <Button
            size='sm'
            leftIcon={<SiAdobeacrobatreader color='red' size='1em' />}>
            Resume
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
