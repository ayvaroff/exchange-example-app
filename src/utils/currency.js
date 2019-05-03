import fx from 'money'
import numeral from 'numeral'

const currencySymbols = {
  EUR: '€',
  GBP: '£',
  USD: '$',
  RUB: '₽',
}

const prepareFX = ({
  base,
  rates,
  loading
}) => {
  fx.base = base
  fx.rates = rates

  return !loading ? fx : null
}

export const getCurrencySymbol = code => currencySymbols[code] || ''

export const isCurrency = value => /^(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/.test(value)

export const buildCurrencyString = value => value //numeral(value).format('0,0.00')

export const getNumeral = value => numeral(value)

export const convert = ({
  amount,
  from,
  to
}, rates) => {
  const preparedFx = prepareFX(rates)
  return preparedFx ? preparedFx.convert(amount, { from, to }) : 0
}
