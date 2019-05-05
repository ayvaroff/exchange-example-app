import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { getCurrencySymbol } from 'utils/currency'

const ExchangeInfo = ({
  ratesError,
  exchangeFrom,
  exchangeTo,
  rate,
}) => {
  const fromString = `${getCurrencySymbol(exchangeFrom)} ${rate}`
  const toString = `${getCurrencySymbol(exchangeTo)} 1`

  const info = !ratesError
    ? `${toString} = ${fromString}`
    : <span>No rates</span>

  return (
    <div className={cn('exchange-info', { error: ratesError })}>
      {info}
    </div>
  )
}

ExchangeInfo.propTypes = {
  exchangeFrom: PropTypes.string,
  exchangeTo: PropTypes.string,
  rate: PropTypes.number,
  ratesError: PropTypes.bool,
}

export default ExchangeInfo
