import { Flex } from 'theme-ui'

export const AppFrame = ({ sx, ...props }) => {
  return (
    <Flex
      sx={{
        bg: 'white',
        height: '100vh',
        flexDirection: ['column', '', 'row'],
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        overflow: ['scroll', '', 'hidden'],
        ...sx
      }}
      {...props}
    />
  )
}
