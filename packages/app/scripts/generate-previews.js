'use strict'

const debug = require('debug-logfmt')('microlink-cards:generate-preview')

const { readdirSync, createWriteStream } = require('fs')
const existsFile = require('exists-file')
const mql = require('@microlink/mql')
const { promisify } = require('util')
const download = require('download')
const makeDir = require('make-dir')
const stream = require('stream')
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..')
const PRESETS_ORIGIN_PATH = path.resolve(ROOT_PATH, 'src/components/presets')
const PRESET_DIST_PATH = path.resolve(ROOT_PATH, 'public/preview')

const outputPreset = preset => path.resolve(PRESET_DIST_PATH, `${preset}.png`)

const PRESETS = readdirSync(PRESETS_ORIGIN_PATH)
  .map(filename => path.basename(filename, '.js'))
  .filter(preset => ['index', 'scope'].includes(preset))

const pipeline = promisify(stream.pipeline)

const { homepage } = require('./package.json')

const generatePreview = async preset => {
  const { data } = await mql(`${homepage}/?preset=${preset}`, {
    apiKey: process.env.MICROLINK_API_KEY,
    waitUntil: ['load', 'networkidle0'],
    force: true,
    adblock: false,
    element: '#screenshot',
    meta: false,
    screenshot: true
  })

  await pipeline(
    download(data.screenshot.url),
    createWriteStream(outputPreset(preset))
  )

  debug({ preset })
}

const main = async () => {
  let presets = PRESETS
  if (!process.env.MICROLINK_CARDS_PREVIEW_FORCE) {
    presets = presets.filter(preset => !existsFile.sync(outputPreset(preset)))
  }

  await makeDir(PRESET_DIST_PATH)
  await Promise.all(presets.map(generatePreview))
}

main()
  .then(() => {
    process.exit()
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
