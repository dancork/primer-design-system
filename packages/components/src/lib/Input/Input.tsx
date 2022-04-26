import styled from 'styled-components'
import InputAdornment from './Input.Adornment'
import InputButton from './Input.Button'
import InputText from './Input.Text'

export const StyledInput = styled.div({
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateAreas: '"input"',
})
StyledInput.displayName = 'Input'

type CompoundInput = typeof StyledInput & {
  Adornment: typeof InputAdornment
  Button: typeof InputButton
  Text: typeof InputText
}

const Input = Object.assign({}, StyledInput, {
  Adornment: InputAdornment,
  Button: InputButton,
  Text: InputText,
}) as CompoundInput

export default Input
