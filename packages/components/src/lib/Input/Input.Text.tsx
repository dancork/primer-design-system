import { transparentize } from 'polished'
import styled from 'styled-components'

export interface InputTextProps {
  adornmentWidth?: number
}

const InputText = styled.input<InputTextProps>(({ theme, adornmentWidth }) => ({
  boxSizing: 'border-box',
  gridArea: 'input',
  outline: 'none',
  padding: '9px 132px 9px 0',
  margin: '0',
  border: `1px solid ${theme.tokens.colors.gray500}`,
  borderRadius: theme.tokens.radii.rounded,
  ':hover': {
    boxShadow: `0 0 0 3px ${transparentize(0.25)(
      theme.tokens.colors.yellow300,
    )}`,
  },
  ':focus': {
    borderColor: theme.tokens.colors.gray900,
    boxShadow: `0 0 0 3px ${theme.tokens.colors.yellow300}`,
  },
  backgroundColor: theme.tokens.colors.white,
  fontFamily: theme.tokens.fontFamily,
  color: theme.tokens.colors.gray900,
  ...theme.tokens.fontStyles.body,
  ':disabled': {
    color: theme.tokens.colors.gray500,
    backgroundColor: theme.tokens.colors.gray300,
    '&::-webkit-input-placeholder': {
      color: theme.tokens.colors.gray500,
    },
    '&::-moz-placeholder': {
      color: theme.tokens.colors.gray500,
    },
  },
  '&::-webkit-input-placeholder': {
    color: theme.tokens.colors.gray300,
  },
  '&::-moz-placeholder': {
    color: theme.tokens.colors.gray300,
  },
  paddingLeft: `${12 + (adornmentWidth ?? 0)}px`,
  ':last-child': {
    paddingRight: '12px',
  },
  '&[aria-invalid="true"]': {
    borderColor: theme.tokens.colors.red300,
    color: theme.tokens.colors.red300,
    boxShadow: 'none',
  },
}))
InputText.defaultProps = {
  type: 'text',
}

export default InputText
