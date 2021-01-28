import {
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Link,
  Box,
  Button,
  ButtonGroup,
  Stack,
  HStack
} from '@chakra-ui/react'
// import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { Glass } from '../components/Glass'
import { Sidebar } from '../components/Sidebar'
import { Background } from '../components/Background'
import { IconContext } from 'react-icons'
import {
  SiGithub,
  SiLinkedin,
  SiAdobeacrobatreader,
  SiReact,
  SiNextDotJs,
  SiAmazonaws,
  SiAdobephotoshop,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiWordpress,
  SiApache,
  SiPhp,
  SiMaserati,
  SiShell,
  SiQualcomm,
  SiNissan
} from 'react-icons/si'

const iconPadding = {
  margin: '0.25rem'
}

const Index = () => (
  <IconContext.Provider value={{ size: '2em' }}>
    <Background>
      <DarkModeSwitch />
      <Glass mt='2rem' overflowY='scroll'>
        <Flex>
          <Sidebar>
            <Heading fontSize='xl'>Jeremy Moseley</Heading>
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
          </Sidebar>
          <Main>
            <Heading fontSize='2xl' mt='0' pb='1rem'>
              Skills
            </Heading>
            <HStack spacing='1em' justify='center'>
              <SiReact />
              <SiNextDotJs />
              <SiAmazonaws />
              <SiAdobephotoshop />
              <SiJavascript />
              <SiTypescript />
              <SiTailwindcss />
              <SiWordpress />
              <SiPhp />
              <SiApache />
            </HStack>
            <Heading fontSize='2xl' mt='2rem'>
              Projects
            </Heading>
            <SimpleGrid columns={3} spacing='1.5rem' py='2rem'>
              <Glass p='1rem'>
                <Heading fontSize='lg'>Social Media Starter</Heading>
                <Text fontSize='sm' py='1rem'>
                  Get up and running quickly in AWS and Next.js
                </Text>
                <ButtonGroup spacing='2'>
                  <Button size='xs'>Demo</Button>
                  <Button size='xs'>Source</Button>
                </ButtonGroup>
              </Glass>
              <Glass p='1rem'>
                <Heading fontSize='lg'>PWA Mobile App</Heading>
                <Text fontSize='sm' py='1rem'>
                  Example of a progressive web app w/ Lighthouse score.
                </Text>
                <ButtonGroup spacing='2'>
                  <Button size='xs'>Demo</Button>
                  <Button size='xs'>Source</Button>
                </ButtonGroup>
              </Glass>
              <Glass p='1rem'>
                <Heading fontSize='lg'>Monte Hall Brainteaser</Heading>
                <Text fontSize='sm' py='1rem'>
                  See the math behind door number one.
                </Text>
                <ButtonGroup spacing='2'>
                  <Button size='xs'>Demo</Button>
                  <Button size='xs'>Source</Button>
                </ButtonGroup>
              </Glass>
            </SimpleGrid>
            <Heading fontSize='2xl'>Articles</Heading>
            <SimpleGrid columns={3} spacing='1.5rem' py='2rem'>
              <Box bg='tomato' height='80px' minWidth='220px'></Box>
              <Box bg='tomato' height='80px' minWidth='220px'></Box>
              <Box bg='tomato' height='80px' minWidth='220px'></Box>
            </SimpleGrid>
            <Heading fontSize='2xl'>Clients</Heading>
            <HStack spacing='1em' justify='center'>
              <SiMaserati style={iconPadding} />
              <SiShell style={iconPadding} />
              <SiQualcomm style={iconPadding} />
              <SiNissan style={iconPadding} />
            </HStack>
            <Footer>
              <Text fontSize='xs' align='center'>
                Jeremy Moseley &copy; {new Date().getFullYear()}
              </Text>
            </Footer>
          </Main>
        </Flex>
      </Glass>
    </Background>
  </IconContext.Provider>
)

export default Index
