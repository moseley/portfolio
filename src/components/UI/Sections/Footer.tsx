import { Box, BoxProps, Text, Divider } from '@chakra-ui/react'

export const Footer = (props: BoxProps) => {
  return (
    <Box as='footer' pt='1rem' {...props}>
      <Divider />
      <Text fontSize='xs' align='center' pt='1rem'>
        Jeremy Moseley &copy; {new Date().getFullYear()}
      </Text>
    </Box>
  )
}
