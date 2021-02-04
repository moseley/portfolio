import { Box, forwardRef } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import * as React from 'react'

const MotionBox: any = motion.custom(
  forwardRef((props: React.ComponentProps<typeof MotionBox>, ref) => {
    const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)))
    return <Box ref={ref} {...chakraProps} />
  })
)

export { MotionBox }