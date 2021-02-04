import * as React from 'react'
import { Flex } from '@chakra-ui/react'
import { Background } from './Background'
import { DarkModeSwitch } from './DarkModeSwitch'
import { Glass } from './Glass'
import { Sidebar } from './Sidebar'
import { Main } from './Main'
import { Breadcrumb } from './Breadcrumb'
import { Footer } from './Footer'

const UI = ({ children }: { children: React.ReactNode }) => {
  return (
    <Background>
      <DarkModeSwitch />
      <Glass mt='2rem' overflowY='auto'>
        <Flex>
          <Sidebar />
          <Main>
            <Breadcrumb />
            {children}
            <Footer />
          </Main>
        </Flex>
      </Glass>
    </Background>
  )
}

export default UI