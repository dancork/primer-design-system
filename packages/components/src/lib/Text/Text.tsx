import React from 'react'
import styled, { CSSObject } from 'styled-components'
import { Color } from '@primer-design-system/foundations'

enum Variant {
  Body = 'body',
  BodyBold = 'bodyBold',
  Footnote = 'footnote',
}

export interface TextProps {
  variant?: `${Variant}`
  themeColor?: Color
  children: React.ReactNode
}

const Text = styled.span<TextProps>(
  ({ theme, variant = Variant.Body, themeColor = 'gray900' }) => {
    const styles: Record<Variant, CSSObject> = {
      [Variant.Body]: {
        ...theme.tokens.fontStyles.body,
        fontWeight: theme.tokens.fontWeights.regular,
      },
      [Variant.BodyBold]: {
        ...theme.tokens.fontStyles.body,
        fontWeight: theme.tokens.fontWeights.bold,
      },
      [Variant.Footnote]: {
        ...theme.tokens.fontStyles.footnote,
        fontWeight: theme.tokens.fontWeights.regular,
      },
    }
    return {
      ...styles[variant],
      fontFamily: theme.tokens.fontFamily,
      color: theme.tokens.colors[themeColor],
    }
  },
)

export default Text
