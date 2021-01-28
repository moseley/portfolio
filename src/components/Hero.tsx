import { Flex, Heading, Text } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <Flex justifyContent='center' alignItems='center' height='100vh'>
    <Heading fontSize='6vw'>Jeremy Moseley</Heading>
    <Text fontSize='lg'>Bay area based full stack developer</Text>
  </Flex>
)

Hero.defaultProps = {
  title: 'Jeremy Moseley'
}
