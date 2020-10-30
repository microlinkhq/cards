import { Flex, Text } from 'theme-ui'
import { Progress } from './progress'

const getColors = (value, theme) => {
  if (value >= 90) {
    return {
      primary: '#0CCE6B',
      secondary: theme === 'dark' ? '#1F3228' : '#E7FAF0'
    }
  }

  if (value >= 50) {
    return {
      primary: '#FFA400',
      secondary: theme === 'dark' ? '#372E1E' : '#FFF6E6'
    }
  }
  return {
    primary: '#FF4E42',
    secondary: theme === 'dark' ? '#372624' : '#FFEEEC'
  }
}

export const Lighthouse = ({ value, label, theme }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Progress value={value} {...getColors(value, theme)} />
      <Text
        sx={{
          mt: '10px',
          fontWeight: 300,
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          color: theme === 'dark' ? '#F5F5F5' : '#212121',
          fontSize: '24px'
        }}
      >
        {label}
      </Text>
    </Flex>
  )
}
