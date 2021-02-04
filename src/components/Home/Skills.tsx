import { Heading,HStack } from '@chakra-ui/react'
import {
  SiReact,
  SiNextDotJs,
  SiAmazonaws,
  SiAdobephotoshop,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiWordpress,
  SiApache,
  SiPhp
} from 'react-icons/si'

const Skills = () => {
  return (
    <>
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
    </>
  )
}

export default Skills