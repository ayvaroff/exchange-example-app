import React from 'react'
import PropTypes from 'prop-types'

import ExchangeBlockPart from 'components/ExchangeBlockPart'
import ExchangeInfo from 'components/ExchangeInfo'

const ExchangeBlock = ({
  exchangeAmount,
  exchangeConverted,
  exchangeFrom,
  exchangeTo,
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
      selected={exchangeFrom}
      value={exchangeAmount}
    />
    <ExchangeBlockPart
      className="exchange-block-to"
      onToggleChange={e => onToggleChange(e, false)}
      pockets={pockets}
      prefix="+"
      readOnly
      selected={exchangeTo}
      value={exchangeConverted}
    />
    <ExchangeInfo
      exchangeFrom={exchangeFrom}
      exchangeTo={exchangeTo}
      rate={rate}
    />
    <span className="exchange-block-arrows">
      &#8645;
    </span>
    <button
      className="exchange-block-btn"
      onClick={makeConvertion}
      type="button"
    >
      Exchange
    </button>
  </div>
)

ExchangeBlock.propTypes = {
  exchangeAmount: PropTypes.number,
  exchangeConverted: PropTypes.number,
  exchangeFrom: PropTypes.string,
  exchangeTo: PropTypes.string,
  makeConvertion: PropTypes.func,
  onToggleChange: PropTypes.func,
  onInputChange: PropTypes.func,
  pockets: PropTypes.object,
  rate: PropTypes.number,
}

export default ExchangeBlock
