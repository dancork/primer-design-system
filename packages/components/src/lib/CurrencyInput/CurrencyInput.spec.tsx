import * as rooks from 'rooks'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '../../test-utils'
import CurrencyInput from './CurrencyInput'

jest.mock('rooks', () => {
  const originalModule = jest.requireActual('rooks')
  return {
    __esModule: true,
    ...originalModule,
    useNavigatorLanguage: jest.fn(),
  }
})

const useNavigatorLanguage = rooks.useNavigatorLanguage as jest.Mock

const currencies = ['EUR', 'USD', 'JPY']

describe('CurrencyInput', () => {
  beforeEach(() => {
    useNavigatorLanguage.mockReturnValue('en-GB')
  })

  describe('formatting value when currency is not selected', () => {
    test('en-GB', () => {
      render(
        <CurrencyInput availableCurrencies={currencies} value={1234567890} />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('value', '12,345,678.90')
      act(() => input.focus())
      expect(input).toHaveAttribute('value', '12345678.9')
    })
    test('de-DE', () => {
      useNavigatorLanguage.mockReturnValue('de-DE')
      render(
        <CurrencyInput availableCurrencies={currencies} value={1234567890} />,
      )
      const input = screen.getByRole('textbox')
      expect(input)
      expect(input).toHaveAttribute('value', '12.345.678,90')
      act(() => input.focus())
      expect(input).toHaveAttribute('value', '12345678,9')
    })
  })
  describe('formatting value when currency is JPY', () => {
    test('en-GB', () => {
      render(
        <CurrencyInput
          availableCurrencies={currencies}
          currency="JPY"
          value={1234567890}
        />,
      )
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'value',
        '1,234,567,890',
      )
    })
    test('de-DE', () => {
      useNavigatorLanguage.mockReturnValue('de-DE')
      render(
        <CurrencyInput
          availableCurrencies={currencies}
          currency="JPY"
          value={1234567890}
        />,
      )
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'value',
        '1.234.567.890',
      )
    })
  })
  describe('onChange prop called when changing the value', () => {
    test('valid input and no currency set', async () => {
      const onChangeSpy = jest.fn()
      render(
        <CurrencyInput
          availableCurrencies={currencies}
          onChange={onChangeSpy}
        />,
      )
      const input = screen.getByRole('textbox')
      act(() => input.focus())
      await userEvent.keyboard('1234567890')
      fireEvent.blur(input)
      expect(onChangeSpy).toHaveBeenCalledWith(123456789000, '', false)
    })
    test('invalid input and no currency set', async () => {
      const onChangeSpy = jest.fn()
      render(
        <CurrencyInput
          availableCurrencies={currencies}
          onChange={onChangeSpy}
        />,
      )
      const input = screen.getByRole('textbox')
      act(() => input.focus())
      await userEvent.keyboard('1234567890.000')
      fireEvent.blur(input)
      expect(onChangeSpy).toHaveBeenCalledWith('', '', true)
    })
    test('valid input and currency is JPY', async () => {
      const onChangeSpy = jest.fn()
      render(
        <CurrencyInput
          availableCurrencies={currencies}
          onChange={onChangeSpy}
          currency="JPY"
        />,
      )
      const input = screen.getByRole('textbox')
      act(() => input.focus())
      await userEvent.keyboard('1234567890')
      fireEvent.blur(input)
      expect(onChangeSpy).toHaveBeenCalledWith(1234567890, 'JPY', false)
    })
    test('invalid input and currency is JPY', async () => {
      const onChangeSpy = jest.fn()
      render(
        <CurrencyInput
          availableCurrencies={currencies}
          onChange={onChangeSpy}
          currency="JPY"
        />,
      )
      const input = screen.getByRole('textbox')
      act(() => input.focus())
      await userEvent.keyboard('1234567890.')
      fireEvent.blur(input)
      expect(onChangeSpy).toHaveBeenCalledWith('', 'JPY', true)
    })
  })
  describe('onChange prop called when changing the currency', () => {
    test('to EUR', async () => {
      const onChangeSpy = jest.fn()
      render(
        <CurrencyInput
          availableCurrencies={currencies}
          onChange={onChangeSpy}
          value={1234567890}
        />,
      )
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByRole('option', { name: /EUR/ }))
      expect(onChangeSpy).toHaveBeenCalledWith(1234567890, 'EUR', false)
    })
    test('to JPY', async () => {
      const onChangeSpy = jest.fn()
      render(
        <CurrencyInput
          availableCurrencies={currencies}
          onChange={onChangeSpy}
          value={1234567890}
        />,
      )
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByRole('option', { name: /JPY/ }))
      expect(onChangeSpy).toHaveBeenCalledWith(1234567890, 'JPY', false)
    })
  })
})
