import { ChakraProvider } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { UI } from '../components/UI'

import theme from '../theme'
import { AppProps } from 'next/app'
import * as React from 'react'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <motion.div
        key={router.route}
        initial='pageInitial'
        animate='pageAnimate'
        variants={{
          pageinitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1
          }
        }}>
        <UI>
          <Component {...pageProps} />
        </UI>
      </motion.div>
    </ChakraProvider>
  )
}

export default MyApp
