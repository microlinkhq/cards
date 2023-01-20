'use strict'

const fs = require('fs')
const path = require('path')
const existsFile = require('exists-file')

const { PRESETS_ORIGIN_PATH, PREVIEWS_DIST_PATH } = require('./consts')

const getPresetSlug = presetName =>
  presetName
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/ /g, '-')

const getExportName = presetSlug =>
  presetSlug
    .split('-')
    .map((word, i) => {
      if (i === 0) {
        return word.toLowerCase()
      }

      return `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`
    })
    .join('')

const getDefaultPresetContents = (
  exportName,
  presetName
) => `/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Box, Text } from './scope'

const code = (
  <Inline>
    <Box>
      <Text>{query.greeting}</Text>
    </Box>
  </Inline>
)

const query = { greeting: '👋 ${presetName}' }

export const ${exportName} = { name: '${presetName}', code, query }
`

const main = async () => {
  const presetName = process.argv[2]

  if (!presetName) {
    throw new Error('Missing a preset name')
  }

  const slug = getPresetSlug(presetName)
  const presetPath = path.resolve(PRESETS_ORIGIN_PATH, `${slug}.js`)

  if (existsFile.sync(presetPath)) {
    const indicator = `"${presetName}"${
      presetName !== slug ? ` (${slug})` : ''
    }`

    throw new Error(
      `The name ${indicator} is already in use.\nSomething wrong? Open an issue: https://github.com/microlinkhq/cards/issues`
    )
  }

  const exportName = getExportName(slug)

  fs.writeFileSync(presetPath, getDefaultPresetContents(exportName, presetName))

  const defaultPreviewPath = path.resolve(PREVIEWS_DIST_PATH, 'microlink.png')
  const previewPath = path.resolve(PREVIEWS_DIST_PATH, `${slug}.png`)

  fs.copyFileSync(defaultPreviewPath, previewPath)

  console.log('\x1b[32m%s\x1b[32m', `✅ Successfully created ${slug}.js`)

  const presetsIndexPath = path.resolve(PRESETS_ORIGIN_PATH, 'index.js')

  const presetsIndex = fs.readFileSync(presetsIndexPath)

  const newPresetsIndex =
    [
      ...presetsIndex
        .toString()
        .split('\n')
        .filter(line => !!line),
      `export { ${exportName} } from './${slug}'`
    ]
      .sort()
      .join('\n') + '\n'

  fs.writeFileSync(presetsIndexPath, newPresetsIndex)
}

main()
  .then(() => {
    process.exit()
  })
  .catch(err => {
    console.error(err.message)
    process.exit(1)
  })
