import { Image, forwardRef } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import * as React from 'react'

const MotionImage: any = motion.custom(
  forwardRef((props: React.ComponentProps<typeof MotionImage>, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    )
    return <Image ref={ref} {...chakraProps} />
  })
)

export { MotionImage }
