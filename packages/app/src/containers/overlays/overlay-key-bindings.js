import { useContext } from 'react'
import { Text, Box, Flex } from 'theme-ui'

import { Button } from '@/components'
import { AppContext } from '@/context'
import { isMac } from '@/lib'

const ctrl = isMac ? 'cmd' : 'ctrl'

const OverlayKeyBindings = () => {
  const {
    hideOverlay,
    theme: { bg, borderColor, color }
  } = useContext(AppContext)

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Flex
          as='header'
          sx={{
            p: '10px',
            fontWeight: 'bold',
            borderBottom: 1,
            borderColor
          }}
        >
          <Box sx={{ width: '25%', mr: 3 }}>Combination</Box>
          <Box sx={{ width: '75%' }}>Description</Box>
        </Flex>
        {[
          {
            combination: [ctrl, ' + ', 'j'],
            description: 'Show keybindings information'
          },
          {
            combination: [ctrl, ' + ', 'k'],
            description: 'Show information about the project'
          },
          {
            combination: [ctrl, ' + ', 's'],
            description: 'Get the current image URL'
          },
          {
            combination: [ctrl, ' + ', 'click'],
            description: 'Edit the selected value on query variables'
          },
          {
            combination: [ctrl, ' + ', 'p'],
            description: 'Change the editor theme'
          },
          {
            combination: ['esc'],
            description: 'Close the active modal'
          }
        ].map(({ combination, description }) => (
          <Flex
            as='section'
            key={combination}
            sx={{ lineHeight: 2, p: 3, borderBottom: 1, borderColor }}
          >
            <Box sx={{ width: '25%', mr: 3 }}>
              <Box
                sx={{
                  display: 'inline',
                  py: '3px',
                  px: '6px',
                  border: 1,
                  borderColor,
                  borderRadius: 4
                }}
              >
                {combination.map((key) => (
                  <Text
                    sx={{
                      fontSize: 0,
                      textTransform: 'uppercase',
                      color,
                      display: 'inherit'
                    }}
                    key={key}
                    children={key}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ width: '75%' }}>{description}</Box>
          </Flex>
        ))}
      </Box>

      <Flex as='footer' sx={{ justifyContent: 'flex-end', pt: 4 }}>
        <Button
          sx={{ bg: color, color: bg }}
          onClick={hideOverlay}
          children='Got it'
        />
      </Flex>
    </>
  )
}

export default OverlayKeyBindings
