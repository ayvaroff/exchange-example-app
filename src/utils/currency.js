import fx from 'money'

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

export const isCurrency = value => /^(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{0,2})?$/.test(value)

export const convert = ({
  amount,
  from,
  to,
  fixed = 2,
}, rates) => {
  const preparedFx = prepareFX(rates)
  const convertedValue = preparedFx ? preparedFx.convert(amount, { from, to }).toFixed(fixed) : 0
  return parseFloat(convertedValue)
}
