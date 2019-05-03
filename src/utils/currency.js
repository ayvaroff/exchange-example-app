import fx from 'money'

const currencySymbols = {
  EUR: '€',
  GBP: '£',
  USD: '$',
  RUB: '₽',
}

export const getCurrencySymbol = code => currencySymbols[code] || ''

export const isCurrency = value => /^(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/.test(value)
