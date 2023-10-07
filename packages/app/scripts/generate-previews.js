'use strict'

const debug = require('debug-logfmt')('microlink-cards:generate-preview')

const { readdirSync, createWriteStream } = require('fs')
const mql = require('@microlink/mql')
const { promisify } = require('util')
const download = require('download')
const makeDir = require('make-dir')
const stream = require('stream')
const path = require('path')
const fs = require('fs')

const { PRESETS_ORIGIN_PATH, PREVIEWS_DIST_PATH } = require('./consts')

const outputPreset = preset => path.resolve(PREVIEWS_DIST_PATH, `${preset}.png`)

const PRESETS = readdirSync(PRESETS_ORIGIN_PATH)
  .map(filename => path.basename(filename, '.js'))
  .filter(preset => !['index', 'scope'].includes(preset))

const pipeline = promisify(stream.pipeline)

const { homepage } = require('../package.json')

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
    presets = presets.filter(preset => !fs.existsSync(outputPreset(preset)))
  }

  await makeDir(PREVIEWS_DIST_PATH)
  await Promise.all(presets.map(generatePreview))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
