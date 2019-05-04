import * as currency from './index'

jest.mock('money')

describe('Test currency utils ', () => {
  const convertedValue = 123
  const symbols = {
    EUR: '€',
    USD: '$',
  }

  const exchange = {
    amount: 15,
    from: 'USD',
    to: 'EUR',
  }

  const rates = {
    base: 'USD',
    rates: {
      USD: 1,
      EUR: 1.23,
      GBP: 1.5,
    }
  }

  beforeEach(() => {
    require('money').convert.mockReturnValue(convertedValue)
  })

  it('with get currency symbol', () => {
    expect(currency.getCurrencySymbol('EUR')).toBe(symbols.EUR)
    expect(currency.getCurrencySymbol('USD')).toBe(symbols.USD)
    expect(currency.getCurrencySymbol('BTC')).toBe('')
  })

  it('with value formatting', () => {
    expect(currency.formatValue(11.2314)).toBe(11.23)
    expect(currency.formatValue(11.2389)).toBe(11.24)
    expect(currency.formatValue(11)).toBe(11)
  })

  it('with converting', () => {
    expect(currency.convert({
      ...exchange
    }, {
      ...rates
    })).toBe(123)
  })
})
