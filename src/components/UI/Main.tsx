import { Flex, FlexProps } from '@chakra-ui/react'

export const Main = (props: FlexProps) => (
  <Flex
    direction='column'
    spacing='1.5rem'
    width='100%'
    maxWidth='48rem'
    // mt='1rem'
    pt='1.5rem'
    px='1.5rem'
    {...props}
  />
)
