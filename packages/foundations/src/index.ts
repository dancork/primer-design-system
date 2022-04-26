import * as tokens from './tokens/tokens'
import { ColorEnum } from './tokens/colors'

export const theme = {
  tokens,
}

export type Theme = typeof theme

export { ColorEnum }
export type Color = `${ColorEnum}`
