import mql from '@microlink/mql'

export interface MicrolinkCardsOptions {
  /**
   * Options passed to the Microlink Query Language (MQL) API.
   * See: https://microlink.io/api
   */
  mqlOpts?: mql.MqlOptions
  /**
   * Array of entries to generate cards for.
   * Each entry can be an object with properties like preset, title, etc.
   * or a string URL.
   */
  entries?: Record<string, unknown>[]
  /**
   * Output configuration for generated cards.
   */
  output: {
    /**
     * Function to generate filename from each entry.
     * Receives the entry object and should return a string.
     */
    filename: (entry: Record<string, unknown>) => string
    /**
     * The output directory where cards will be written.
     */
    path: string
    /**
     * If true, skip generating cards that already exist.
     * @default true
     */
    incremental?: boolean
  }
  /**
   * Number of cards to generate concurrently.
   * @default 2
   */
  concurrency?: number
}

/**
 * Generate Microlink Cards on build time.
 *
 * @example
 * ```js
 * const microlinkCards = require('@microlink/cards')
 * const slugify = require('@sindresorhus/slugify')
 *
 * const build = async () =>
 *   microlinkCards({
 *     entries: [
 *       {
 *         preset: 'rauchg',
 *         title: 'hello world'
 *       }
 *     ],
 *     mqlOpts: {
 *       apiKey: process.env.MICROLINK_API_KEY
 *     },
 *     output: {
 *       filename: ({ title }) => slugify(title),
 *       path: 'dist/images/cards',
 *       incremental: true
 *     }
 *   })
 *
 * build()
 *   .then(outputFiles => console.log(outputFiles))
 *   .catch(error => console.error(error) || process.exit(1))
 * ```
 */
export default function microlinkCards(
  options: MicrolinkCardsOptions
): Promise<string[]>
