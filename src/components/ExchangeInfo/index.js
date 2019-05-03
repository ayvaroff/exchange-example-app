import React from 'react'
import PropTypes from 'prop-types'

import { getCurrencySymbol } from 'utils/currency'

const ExchangeInfo = ({
  exchangeFrom,
  exchangeTo,
  rate,
}) => {
  const fromString = `${getCurrencySymbol(exchangeFrom)} ${rate}`
  const toString = `${getCurrencySymbol(exchangeTo)} 1`

  return (
    <div className="exchange-info">
      {`${toString} = ${fromString}`}
    </div>
  )
}

ExchangeInfo.propTypes = {
  exchangeFrom: PropTypes.string,
  exchangeTo: PropTypes.string,
  rate: PropTypes.number,
}

export default ExchangeInfo
