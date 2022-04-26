import { useMemo } from 'react'

interface UseCurrencyProps {
  /**
   * The locale to use for formatting the currency.
   */
  locale: string
  /**
   * Currency code, e.g. 'USD'
   */
  currency: string | undefined
}

type UseCurrencyResponse = {
  symbol?: string
  decimal: string | undefined
  group: string | undefined
  fractionalDigits: number | undefined
}

export const getCurrency = ({ locale, currency }: UseCurrencyProps) => {
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

  const parts = numberFormat.formatToParts(12345678.12345678)

  const symbol = parts.find(({ type }) => type === 'currency')?.value
  const group = parts.find(({ type }) => type === 'group')?.value
  const decimal = parts.find(({ type }) => type === 'decimal')?.value
  const fractionalDigits =
    parts.find(({ type }) => type === 'fraction')?.value.length ??
    // some currencies have 0 fractional digits
    (currency ? 0 : undefined)

  return {
    symbol,
    decimal,
    group,
    fractionalDigits,
  }
}

const useCurrency = ({
  locale,
  currency,
}: UseCurrencyProps): UseCurrencyResponse => {
  return useMemo(() => getCurrency({ locale, currency }), [locale, currency])
}

export default useCurrency
