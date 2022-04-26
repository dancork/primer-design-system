import styled from 'styled-components'
import InputText from './Input.Text'

export interface InputAdornmentProps {
  /**
   * The content of the adornment when no children prop passed.
   */
  placeholderText?: string
}

const InputAdornment = styled.div.attrs<InputAdornmentProps>(
  ({ placeholderText, children, theme }) => ({
    children: children ?? placeholderText,
    color: children ? theme.tokens.colors.gray500 : theme.tokens.colors.gray300,
  }),
)<InputAdornmentProps>(({ theme, color }) => ({
  boxSizing: 'border-box',
  padding: '8px 12px 8px 13px',
  gridArea: 'input',
  justifySelf: 'start',
  alignSelf: 'stretch',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: theme.tokens.fontFamily,
  ...theme.tokens.fontStyles.body,
  fontWeight: theme.tokens.fontWeights.bold,
  color,
  [`${InputText}:disabled + &`]: {
    color: theme.tokens.colors.gray500,
  },
}))

export default InputAdornment
