import { Flex, FlexProps, useColorMode, Heading, Text, Link, Button, Stack, } from '@chakra-ui/react'
import { SiGithub, SiLinkedin, SiAdobeacrobatreader } from 'react-icons/si'

export const Sidebar = (props: FlexProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Flex
      borderTopLeftRadius='xl'
      borderBottomLeftRadius='xl'
      direction='column'
      spacing='1.5rem'
      p='1.5rem'
      maxW='240px'
      style={{
        backdropFilter: 'blur(5px)',
        backgroundImage: isDark
          ? 'linear-gradient(to right bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2))'
          : 'linear-gradient(to right bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.2))'
      }}
      {...props}>
      <Heading fontSize='40px' color='#3B5957' textShadow='0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7)'>Jeremy Moseley</Heading>
        <Text py='1rem'>Bay area based full stack developer</Text>
        <Stack spacing='0.5rem'>
          <Link
            _hover={undefined}
            href='https://github.com/moseley'
            title='Visit GitHub Profile'
            isExternal>
            <Button size='md' leftIcon={<SiGithub size='1em' />} w='100%'>
              GitHub
            </Button>
          </Link>
          <Link
            _hover={undefined}
            href='https://www.linkedin.com/in/jeremymoseley/'
            title='Visit LinkedIn Profile'
            isExternal>
            <Button size='md' leftIcon={<SiLinkedin color='blue' size='1em' />} w='100%'>
              LinkedIn
            </Button>
          </Link>
          <Link
            _hover={undefined}
            href='https://jeremymoseley.com/JeremyMoseley.pdf'
            title='Download Resume'
            isExternal>
            <Button
              size='md'
              leftIcon={<SiAdobeacrobatreader color='red' size='1em' />}
              w='100%'>
              Resume
            </Button>
          </Link>
        </Stack>
    </Flex>
  )
}
