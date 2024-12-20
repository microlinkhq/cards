'use strict'

const debug = require('debug-logfmt')('microlink-cards')
const mql = require('@microlink/mql')
const { promisify } = require('util')
const makeDir = require('make-dir')
const stream = require('stream')
const pAll = require('p-all')
const path = require('path')
const get = require('dlv')
const fs = require('fs')

const pipeline = promisify(stream.pipeline)

const takeScreenshot = async (url, mqlOpts) => {
  const { data } = await mql(url, {
    adblock: false,
    element: '#screenshot',
    meta: false,
    screenshot: true,
    ...mqlOpts
  })
  return data.screenshot.url
}

module.exports = async ({
  mqlOpts = {},
  entries = [],
  output = {},
  concurrency = 2
} = {}) => {
  if (!get(output, 'path')) {
    throw new TypeError(
      'Missing `output.path`, need to specify an output directory.'
    )
  }

  if (!get(output, 'filename')) {
    throw new TypeError(
      'Missing `output.filename`, need to specify a hashing function.'
    )
  }

  const outputPath = path.resolve(output.path)
  await makeDir(outputPath)

  const actions = entries.map(query => {
    return async () => {
      const hash = output.filename(query)
      const ext = get(mqlOpts, 'screenshot.type', 'png')
      const filepath = path.resolve(output.path, `${hash}.${ext}`)

      if (fs.existsSync(filepath) && output.incremental) return

      const payload = new URLSearchParams(query).toString()
      const cardUrl = `https://cards.microlink.io/?${payload}`

      const url = await takeScreenshot(cardUrl, mqlOpts)
      await pipeline(mql.stream(url), fs.createWriteStream(filepath))

      debug('create', filepath)
      return filepath
    }
  })

  return pAll(actions, { concurrency })
}
