import { Flex } from 'theme-ui'

export const AppFrame = ({ sx, ...props }) => {
  return (
    <Flex
      sx={{
        bg: 'white',
        height: ['initial', '', '100vh'],
        flexDirection: ['column', '', 'row'],
        overflow: ['initial', '', 'hidden'],
        ...sx
      }}
      {...props}
    />
  )
}
