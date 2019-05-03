import React from 'react'
import PropTypes from 'prop-types'

import ExchangeFrom from 'components/ExchangeFrom'
import ExchangeTo from 'components/ExchangeTo'

const ExchangeBlock = ({
  exchangeAmount,
  exchangeConverted,
  exchangeFrom,
  exchangeTo,
  onInputChange,
  pockets,
  setExchangeFrom,
  setExchangeTo,
}) => (
  <div className="exchange">
    <ExchangeFrom
      onInputChange={onInputChange}
      onToggleClick={setExchangeFrom}
      pockets={pockets}
      selected={exchangeFrom}
      value={exchangeAmount}
    />
    <ExchangeTo
      onToggleClick={setExchangeTo}
      pockets={pockets}
      selected={exchangeTo}
      value={exchangeConverted}
    />
  </div>
)

ExchangeBlock.propTypes = {
  exchangeAmount: PropTypes.number,
  exchangeConverted: PropTypes.number,
  exchangeFrom: PropTypes.string,
  exchangeTo: PropTypes.string,
  onInputChange: PropTypes.func,
  pockets: PropTypes.object,
  setExchangeFrom: PropTypes.func,
  setExchangeTo: PropTypes.func,
}

export default ExchangeBlock
