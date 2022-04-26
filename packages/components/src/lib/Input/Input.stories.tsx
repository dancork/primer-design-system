import { Meta, Story } from '@storybook/react/types-6-0'
import Input from './Input'
import InputAdornment from './Input.Adornment'
import InputButton from './Input.Button'
import InputText from './Input.Text'

export default {
  title: 'Components/Input',
  component: Input,
  subcomponents: {
    'Input.Adornment': InputAdornment,
    'Input.Button': InputButton,
    'Input.Text': InputText,
  },
} as Meta

export const Default: Story<React.ComponentProps<typeof Input>> = args => (
  <Input {...args}>
    <InputText />
  </Input>
)
Default.storyName = 'Input'
