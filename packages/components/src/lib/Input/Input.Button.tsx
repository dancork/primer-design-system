import styled from 'styled-components'

import InputText from './Input.Text'

export const InputButton = styled.button(({ theme }) => ({
  boxSizing: 'border-box',
  width: '7.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gridArea: 'input',
  justifySelf: 'end',
  margin: '0',
  padding: '0 13px 0 12px',
  border: 'none',
  backgroundColor: 'transparent',
  borderLeft: `1px solid ${theme.tokens.colors.gray500}`,
  outline: 'none',
  [`:focus, ${InputText}:focus + &`]: {
    borderLeftColor: theme.tokens.colors.gray900,
  },
}))
InputButton.defaultProps = {
  type: 'button',
  tabIndex: 0,
}

export default InputButton
