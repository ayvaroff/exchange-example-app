import React from 'react'
import PropTypes from 'prop-types'

import ExchangeBlockPart from 'components/ExchangeBlockPart'
import ExchangeInfo from 'components/ExchangeInfo'

const ExchangeBlock = ({
  amount,
  converted,
  error,
  from,
  to,
  makeConvertion,
  onInputChange,
  onToggleChange,
  pockets,
  rate,
}) => (
  <div className="exchange-block">
    <ExchangeBlockPart
      onInputChange={onInputChange}
      onToggleChange={e => onToggleChange(e, true)}
      pockets={pockets}
      prefix="-"
      selected={from}
      value={amount}
    />
    <ExchangeBlockPart
      className="exchange-block-to"
      onToggleChange={e => onToggleChange(e, false)}
      pockets={pockets}
      prefix="+"
      readOnly
      selected={to}
      value={converted}
    />
    <ExchangeInfo
      exchangeFrom={from}
      exchangeTo={to}
      rate={rate}
    />
    <span className="exchange-block-arrows">
      &#8645;
    </span>
    <button
      className="exchange-block-btn"
      onClick={makeConvertion}
      type="button"
      disabled={error}
    >
      Exchange
    </button>
  </div>
)

ExchangeBlock.propTypes = {
  amount: PropTypes.number,
  converted: PropTypes.number,
  error: PropTypes.bool,
  from: PropTypes.string,
  to: PropTypes.string,
  makeConvertion: PropTypes.func,
  onToggleChange: PropTypes.func,
  onInputChange: PropTypes.func,
  pockets: PropTypes.object,
  rate: PropTypes.number,
}

export default ExchangeBlock
