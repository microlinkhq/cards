import type { MqlOptions } from '@microlink/mql'

export interface CardsOutput {
  path: string
  filename: (query: string) => string
  incremental?: boolean
}

export interface CardsOptions {
  mqlOpts?: MqlOptions
  entries?: string[]
  output: CardsOutput
  concurrency?: number
}

export interface CardsResult extends Array<string> {
  [index: number]: string
}

declare function cards(options?: CardsOptions): Promise<CardsResult>

export default cards
