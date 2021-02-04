import { Heading, Box, SimpleGrid } from '@chakra-ui/react'

const CodeSnippets = () => {
  return (
    <>
      <Heading fontSize='2xl'>Code Snippets</Heading>
      <SimpleGrid columns={3} spacing='1.5rem' py='2rem'>
        <Box bg='tomato' height='80px' minWidth='220px'></Box>
        <Box bg='tomato' height='80px' minWidth='220px'></Box>
        <Box bg='tomato' height='80px' minWidth='220px'></Box>
      </SimpleGrid>
      </>
  )
}

export default CodeSnippets