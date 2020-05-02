'use strict'

const mql = require('@microlink/mql')
const { promisify } = require('util')
const makeDir = require('make-dir')
const stream = require('stream')
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
    waitUntil: ['load', 'networkidle0'],
    ...mqlOpts
  })
  return data.screenshot.url
}

module.exports = async ({ mqlOpts = {}, entries = [], output = {} } = {}) => {
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

  const promises = entries.map(async query => {
    const payload = new URLSearchParams(query).toString()
    const cardUrl = `https://cards.microlink.io/?${payload}`

    const ext = get(mqlOpts, 'screenshot.type', 'png')
    const hash = output.filename(query)
    const filepath = path.resolve(output.path, `${hash}.${ext}`)

    const url = await takeScreenshot(cardUrl, mqlOpts)
    await pipeline(mql.stream(url), fs.createWriteStream(filepath))

    return filepath
  })

  return Promise.all(promises)
}
