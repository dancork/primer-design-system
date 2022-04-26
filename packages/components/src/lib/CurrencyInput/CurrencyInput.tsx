import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigatorLanguage, useBoundingclientrectRef } from 'rooks'
import { Listbox } from '@headlessui/react'

import useNumberParts from '../hooks/useNumberParts'

import Input from '../Input/Input'
import Text from '../Text/Text'
import useCurrency from '../hooks/useCurrency'
import Dropdown from '../Dropdown/Dropdown'
import usePortal from 'react-useportal'
import DropdownArrow from '../icons/DropdownArrow'
import { CurrencyCode } from './types'

export interface CurrencyInputProps {
  /**
   * The value of the input. The number should be in the currencies lowest demnomination.
   * For example, if the currency is USD, the value should be in cents.
   */
  value?: number
  /**
   * A placeholder to display when the input is empty. If a number is passed, it will be formatted.
   * If a string is passed, it will be displayed as-is.
   */
  placeholder?: string | number
  /**
   * An array of ISO 4217 currency codes to display in the dropdown e.g ['EUR', 'USD', 'JPY']
   */
  availableCurrencies: CurrencyCode[]
  /**
   * Selected ISO 4217 currency code for formatting input value and displaying in dropdown.
   */
  currency?: CurrencyCode
  /**
   * Disables the input and currency dropdown.
   */
  disabled?: boolean
  /**
   * Callback called when the input value or currency changes.
   */
  onChange?: (
    amount: number | '' | undefined,
    currencyCode: CurrencyCode | '',
    hasError: boolean,
  ) => void
}

const CurrencyInput = ({
  value: inputValue,
  currency: inputCurrency,
  availableCurrencies,
  onChange,
  disabled,
  placeholder: inputPlaceholder,
}: CurrencyInputProps) => {
  const locale = useNavigatorLanguage() ?? 'en-GB'

  const [inputRef, inputDimensions] = useBoundingclientrectRef()
  const [adornmentRef, adornmentDimensions] = useBoundingclientrectRef()

  const { Portal } = usePortal()

  const [error, setError] = useState<string | undefined>()
  const [controlledValue, setControlledValue] = useState<string>('')
  const [currency, setCurrency] = useState<CurrencyCode | undefined>(
    inputCurrency && availableCurrencies.includes(inputCurrency)
      ? inputCurrency
      : undefined,
  )
  const [isFocussed, setIsFocussed] = useState(false)

  useEffect(() => {
    if (inputCurrency && availableCurrencies.includes(inputCurrency)) {
      setCurrency(inputCurrency)
    }
  }, [inputCurrency, availableCurrencies, setCurrency])

  const {
    symbol: currencySymbol,
    fractionalDigits = 2,
    decimal = '.',
  } = useCurrency({
    locale,
    currency,
  })

  const decimalisedInputValue = useMemo(
    () =>
      inputValue !== undefined && Number.isInteger(inputValue)
        ? inputValue / Math.pow(10, fractionalDigits)
        : inputValue,
    [inputValue, fractionalDigits],
  )

  const decimalisedPlaceholder = useMemo(
    () =>
      inputPlaceholder !== undefined &&
      typeof inputPlaceholder !== 'string' &&
      Number.isInteger(inputPlaceholder)
        ? inputPlaceholder / Math.pow(10, fractionalDigits)
        : undefined,
    [inputPlaceholder, fractionalDigits],
  )

  const { pretty: maybePrettyPlaceholder } = useNumberParts(
    decimalisedPlaceholder,
    { locale, currency },
  )

  useEffect(() => {
    if (decimalisedInputValue !== undefined) {
      // replace is hacky but it works for now
      setControlledValue(`${decimalisedInputValue}`.replace('.', decimal))
    }
  }, [decimalisedInputValue, setControlledValue, decimal])

  const { pretty = '' } = useNumberParts(decimalisedInputValue, {
    locale,
    currency,
  })

  useEffect(() => {
    if (isFocussed && controlledValue) {
      const matches = controlledValue.match(
        `^[0-9]*${
          fractionalDigits > 0
            ? `(?:[${decimal}][0-9]{0,${fractionalDigits}})?`
            : ''
        }$`,
      )
      if (matches === null) {
        setError(
          `Amount is not valid. Please enter only numbers 0-9${
            fractionalDigits > 0
              ? ` and optionally a ${decimal} with a maximum of ${fractionalDigits} number${
                  fractionalDigits !== 1 ? 's' : ''
                } following`
              : ''
          }.`,
        )
        return
      } else {
        setError(undefined)
      }
    } else {
      setError(undefined)
    }
  }, [isFocussed, controlledValue, setError, decimal, fractionalDigits])

  const triggerOnChange = useCallback(
    (
      value: string,
      currencyCode: CurrencyCode | '' = '',
      hasError: boolean,
    ) => {
      if (!onChange) {
        return
      }
      let amount: number | '' = ''
      if (!hasError && value !== '') {
        // string manipulation should avoid round off issues
        const parts = value.split(decimal)
        const whole = `${parts[0] ?? ''}${(parts[1] ?? '').padEnd(
          fractionalDigits,
          '0',
        )}`
        amount = Number.parseInt(whole, 10)
      }
      onChange(amount, currencyCode, hasError)
    },
    [onChange, decimal, fractionalDigits],
  )

  return (
    <div>
      <Input ref={inputRef}>
        <Input.Text
          onFocus={() => {
            setIsFocussed(true)
            setError(undefined)
          }}
          onBlur={() => {
            // we use the default of change for typing and only call onChange prop on blur
            triggerOnChange(controlledValue, currency, Boolean(error))
            setIsFocussed(false)
          }}
          value={isFocussed || error ? controlledValue : pretty}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setControlledValue(event.target.value)
          }}
          placeholder={
            maybePrettyPlaceholder ?? (inputPlaceholder as string | undefined)
          }
          disabled={disabled}
          adornmentWidth={adornmentDimensions?.width}
          aria-invalid={Boolean(error)}
        />
        {/* casting as any needed to work around incorrect type in hook library */}
        <Input.Adornment ref={adornmentRef as any} placeholderText="€¥">
          {currencySymbol}
        </Input.Adornment>
        <Listbox
          value={currency}
          disabled={disabled}
          onChange={newCurrency => {
            setCurrency(newCurrency)
            triggerOnChange(controlledValue, newCurrency, Boolean(error))
          }}
        >
          <Listbox.Button as={Input.Button}>
            <Text
              variant="bodyBold"
              themeColor={
                disabled ? 'gray500' : currency ? 'gray900' : 'blue300'
              }
            >
              {currency ?? 'Choose'}
            </Text>
            <DropdownArrow fill={disabled ? 'gray500' : 'blue300'} />
          </Listbox.Button>
          <Portal>
            <Listbox.Options
              as={Dropdown}
              style={{
                position: 'fixed',
                top: inputDimensions
                  ? `${inputDimensions.top + inputDimensions.height + 4}px`
                  : '0',
                right: inputDimensions
                  ? `calc(${window.innerWidth - inputDimensions.right}px)`
                  : '0',
              }}
            >
              {availableCurrencies.map(code => {
                // breaking reach hook rules here for speed, would extract in a real project
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const { symbol } = useCurrency({
                  locale,
                  currency: code,
                })
                return (
                  <Listbox.Option as={Fragment} key={code} value={code}>
                    {({ active }) => (
                      <Dropdown.Option active={active}>
                        <Text
                          variant="bodyBold"
                          themeColor={currency === code ? 'white' : 'gray900'}
                        >
                          {code}
                        </Text>
                        <Text
                          variant="bodyBold"
                          themeColor={currency === code ? 'white' : 'gray900'}
                        >
                          {symbol}
                        </Text>
                      </Dropdown.Option>
                    )}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Portal>
        </Listbox>
      </Input>

      {error && (
        <Text variant="footnote" themeColor="red300">
          {error}
        </Text>
      )}
    </div>
  )
}

export default CurrencyInput
