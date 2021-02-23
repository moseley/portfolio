import * as React from 'react'
import { Box, BoxProps, Container } from '@chakra-ui/react'
import { DarkModeSwitch } from './Elements'
import { Glass, Photo } from './Background'
import { Header, Footer } from './Sections'

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
            <Header />
            <Box {...props} />
            <Footer />
          </Box>
        </Glass>
      </Container>
    </>
  )
}
