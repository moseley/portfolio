import { useColorMode, Switch } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Switch
      aria-label='Color Mode Toggle'
      position='fixed'
      top='1rem'
      right='1rem'
      color='green'
      isChecked={isDark}
      onChange={toggleColorMode}
      colorScheme='gray.800'
    />
  )
}
