import { Meta, Story } from '@storybook/react/types-6-0'
import Text, { TextProps } from './Text'

export default {
  title: 'Components/Text',
  component: Text,
} as Meta

export const Default: Story<TextProps> = args => <Text {...args} />
Default.storyName = 'Text'
Default.args = {
  children: 'Hello World',
}
Default.argTypes = {
  variant: {
    defaultValue: 'body',
  },
  themeColor: {
    defaultValue: 'gray900',
  },
}
