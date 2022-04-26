import { Meta, Story } from '@storybook/react/types-6-0'
import DropdownArrow, { DropdownArrowProps } from './DropdownArrow'

export default {
  title: 'Icons/DropdownArrow',
  component: DropdownArrow,
} as Meta

export const Default: Story<DropdownArrowProps> = args => (
  <DropdownArrow {...args} />
)
Default.storyName = 'DropdownArrow'
