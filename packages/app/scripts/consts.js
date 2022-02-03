'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..')

const PRESETS_ORIGIN_PATH = path.resolve(ROOT_PATH, 'src/components/presets')
const PREVIEWS_DIST_PATH = path.resolve(ROOT_PATH, 'public/preview')

module.exports = {
  PRESETS_ORIGIN_PATH,
  PREVIEWS_DIST_PATH
}
