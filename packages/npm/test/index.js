'use strict'

const slugify = require('@sindresorhus/slugify')
const temp = require('temperment')
const test = require('ava')
const fs = require('fs')

const microlinkCards = require('..')

test('`output.path` is required', async t => {
  const error = await t.throwsAsync(async () => microlinkCards(), {
    instanceOf: TypeError
  })

  t.is(
    error.message,
    'Missing `output.path`, need to specify an output directory.'
  )
})

test('`output.filename` is required', async t => {
  const error = await t.throwsAsync(
    async () =>
      microlinkCards({
        output: {
          path: './dist'
        }
      }),
    {
      instanceOf: TypeError
    }
  )

  t.is(
    error.message,
    'Missing `output.filename`, need to specify a hashing function.'
  )
})

test('export cards', async t => {
  const hashing = query => slugify(Object.values(query).join())
  const dir = temp.directory()

  const outputFiles = await microlinkCards({
    entries: [
      {
        preset: 'rauchg',
        title: 'hello world'
      }
    ],
    output: {
      filename: hashing,
      path: dir
    }
  })

  outputFiles.forEach(outputFile => {
    t.true(fs.existsSync(outputFile))
  })
})
