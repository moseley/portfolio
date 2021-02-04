import { Flex, FlexProps, Text } from '@chakra-ui/react'

export const Footer = (props: FlexProps) => {
  return (
    <Flex as='footer' py='1rem' {...props}>
      <Text fontSize='xs' align='center'>
        Jeremy Moseley &copy; {new Date().getFullYear()}
      </Text>
    </Flex>
  )
}
