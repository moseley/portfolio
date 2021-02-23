import * as React from 'react'
import { Box, BoxProps, Container, Text } from '@chakra-ui/react'
import { Photo } from './Background/Photo'
import { DarkModeSwitch } from './Elements/DarkModeSwitch'
import { Glass } from './Background/Glass'
import { Breadcrumb } from './Elements/Breadcrumb'
import { Footer } from './Sections/Footer'
import { PrimaryText, PrimaryButtons } from './Elements'

export const UI = (props: BoxProps) => {
  return (
    <>
      <Photo />
      <Container maxW='4xl' centerContent>
        <DarkModeSwitch />
        <Glass
          mt={12}
          boxShadow='10px 10px 50px rgba(0,0,0,0.2)'
          overflowY='visible'>
          <Box direction='column' spacing='1.5rem' p='1.5rem'>
            <PrimaryText>Jeremy Moseley</PrimaryText>
            <Text py='1rem' fontSize='xl'>
              Full stack developer focused on building React apps
            </Text>
            <PrimaryButtons />
            <Breadcrumb />
            <Box {...props} />
            <Footer />
          </Box>
        </Glass>
      </Container>
    </>
  )
}
