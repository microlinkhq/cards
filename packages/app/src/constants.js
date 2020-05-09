import { toPx } from '@/lib'
import { theme } from '@/theme'

export const ASIDE_HEIGHT_KEY = 'sidebar-json-height'

export const ASIDE_WIDTH_KEY = 'sidebar-width'

export const DEFAULT_ASIDE_HEIGHT = '25%'

export const DEFAULT_ASIDE_WIDTH = '40%'

export const DEFAULT_PRESET = 'rauchg'

export const ASIDE_MIN_WIDTH = '32%'

export const ASIDE_MIN_HEIGHT = '15%'

export const ASIDE_MAX_HEIGHT = '70%'

export const PREVIEW_CARD_WIDTH = 843

export const ASIDE_MAX_WIDTH = size =>
  `calc(${toPx(size.width - PREVIEW_CARD_WIDTH)} - ${theme.space[4]})`

export const SEARCH_WIDTH = '200px'

export const OVERLAY_STATE = {
  PREVIEW: 'preview',
  ABOUT: 'about',
  KEYBINDINGS: 'keybindings'
}
