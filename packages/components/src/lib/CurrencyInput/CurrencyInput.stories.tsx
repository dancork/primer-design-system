import { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'

import CurrencyInput, { CurrencyInputProps } from './CurrencyInput'

export default {
  title: 'Patterns/CurrencyInput',
  component: CurrencyInput,
} as Meta

export const Default: Story<CurrencyInputProps> = args => {
  const [value, setValue] = useState<number | undefined>(undefined)
  return (
    <CurrencyInput
      value={value}
      onChange={(amount, _currencyCode, hasError) => {
        if (!hasError) {
          setValue(amount === '' ? undefined : amount)
        }
      }}
      {...args}
    />
  )
}
Default.storyName = 'CurrencyInput'
Default.args = {
  placeholder: 12345678,
  availableCurrencies: ['EUR', 'USD', 'JPY'],
}
