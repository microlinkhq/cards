const { createMacro } = require('babel-plugin-macros')
const prettier = require('prettier/standalone')
const parserBabel = require('prettier/parser-babel')

const BABEL_OPTS = {
  parser: 'babel',
  plugins: [parserBabel]
}

/**
 * https://prettier.io/docs/en/options.html
 */
const PRETTIER_CONFIG = {
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  printWidth: 60,
  semi: true, // semi: `false` doesn't work fine for this use-case
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none'
}

const toPrettier = ({ referencePath, babel, prettierOpts }) => {
  const children = referencePath.parentPath.parentPath.get('children')
  const body = children[1].getSource()
  let formattedBody = prettier.format(body, prettierOpts)
  if (formattedBody.endsWith(';\n')) {
    formattedBody = formattedBody.substring(0, formattedBody.length - 2)
  }
  referencePath.parentPath.parentPath.replaceWith(
    babel.types.stringLiteral(formattedBody)
  )
}

const createInlineJSXMacro = prettierOpts => ({ references, babel }) => {
  const { default: defaultImport = [] } = references

  defaultImport.forEach(referencePath => {
    if (referencePath.parentPath.type === 'JSXOpeningElement') {
      // prettify code inside jsx
      toPrettier({ referencePath, babel, prettierOpts })
    }
  })
}

const create = prettierOpts => createMacro(createInlineJSXMacro(prettierOpts))

module.exports = create({ ...BABEL_OPTS, ...PRETTIER_CONFIG })
