import { Box, BoxProps, Text } from '@chakra-ui/react'
import { PrimaryText, PrimaryButtons, Breadcrumb } from '../Elements'

export const Header = (props: BoxProps) => {
  return (
    <Box {...props}>
      <PrimaryText>Jeremy Moseley</PrimaryText>
      <Text py='1rem' fontSize='xl'>
        Full stack developer focused on building React apps
      </Text>
      <PrimaryButtons />
      <Breadcrumb />
    </Box>
  )
}
