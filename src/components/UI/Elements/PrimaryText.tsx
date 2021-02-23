import { Text, TextProps } from '@chakra-ui/react'

export const PrimaryText = (props: TextProps) => {
  return (
    <Text
      fontSize='5xl'
      letterSpacing='0.1rem'
      fontWeight='extrabold'
      color='white'
      textShadow='-1px -1px 1px rgba(0,0,0,0.4)'
      {...props}
    />
  )
}
