# @microlink/cards

> Generate [Microlink Cards](https://cards.microlink.io) on build time.

## Install

```bash
$ npm install @microlink/cards --save
```

## Usage

```js
const microlinkCards = require('@microlink/cards')
const slugify = require('@sindresorhus/slugify')

const build = async () =>
  microlinkCards({
    // An entry per every card that will be generated
    entries: [
      {
        preset: 'rauchg',
        title: 'hello world'
      }
    ],
    // Any Microlink API option can be passed
    // See: https://microlink.io/api
    mqlOpts: {
      apiKey: process.env.MICROLINK_API_KEY
    },
    output: {
      // The filename is determined using the entry
      filename: ({ title }) => slugify(title),
      // The output directory where cards will be written
      path: 'dist/images/cards',
      // Builds are incremental by default
      // only new cards will be generated.
      incremental: true
    }
  })

build()
  .then(outputFiles => console.log(outputFiles) && process.exit())
  .catch(err => console.error(err) && process.exit(1))
```

## License

**microlink-cards** © [Microlink](https://microlink.io), Released under the [MIT](https://github.com/microlinkhq/cards/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/microlinkhq/cards/contributors).

> [microlink.io](https://microlink.io) · GitHub [@MicrolinkHQ](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
