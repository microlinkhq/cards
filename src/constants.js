import toPx from '@/lib/to-px'
import theme from '@/theme'

import { BASE_WIDTH, RATIOS } from '@/components/live-editor'

export const ASIDE_HEIGHT_KEY = 'sidebar-json-height'

export const ASIDE_WIDTH_KEY = 'sidebar-width'

export const DEFAULT_ASIDE_HEIGHT = '25%'

export const DEFAULT_ASIDE_WIDTH = '40%'

export const DEFAULT_PRESET = 'rauchg'

export const ASIDE_MIN_WIDTH = '32%'

export const ASIDE_MIN_HEIGHT = '15%'

export const ASIDE_MAX_HEIGHT = '70%'

export const ASIDE_MAX_WIDTH = size =>
  `calc(${toPx(size.width - BASE_WIDTH * RATIOS[RATIOS.length - 1])} - ${
    theme.space[4]
  })`

export const OVERLAY_STATE = {
  PREVIEW: 'preview',
  ABOUT: 'about',
  KEYBINDINGS: 'keybindings'
}

export const PREVIEW_WIDTH = toPx(450)
