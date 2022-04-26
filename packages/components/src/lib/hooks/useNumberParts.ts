import { useMemo } from 'react'

type UseNumberPartsResponse = {
  currency?: string
  value: number | undefined
  pretty: string | undefined
  fractionalDigits: number | undefined
}

const useNumberParts = (
  inputValue: number | undefined,
  {
    locale,
    currency,
  }: {
    /**
     * The locale to use for formatting the currency.
     */
    locale: string
    /**
     * Currency code, e.g. 'USD'
     */
    currency: string | undefined
  },
): UseNumberPartsResponse =>
  useMemo(() => {
    if (inputValue === undefined) {
      return {
        currency: undefined,
        value: undefined,
        pretty: undefined,
        fractionalDigits: undefined,
      }
    }

    const numberFormat = currency
      ? new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
        })
      : new Intl.NumberFormat(locale, {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })

    const parts = numberFormat.formatToParts(inputValue)

    return parts.reduce(
      (acc, { type, value }) => {
        if (type === 'currency') {
          acc.currency = value
          return acc
        }
        if (type === 'fraction') {
          acc.fractionalDigits = value.length
        }
        acc.pretty = `${acc.pretty}${value}`.trim()
        return acc
      },
      {
        currency: undefined,
        value: inputValue,
        pretty: '',
        fractionalDigits: undefined,
      } as UseNumberPartsResponse,
    )
  }, [locale, currency, inputValue])

export default useNumberParts
