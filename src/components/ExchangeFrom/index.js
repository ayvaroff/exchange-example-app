import React from 'react'
import PropTypes from 'prop-types'

import { getCurrencySymbol } from 'utils/currency'

import CurrencyInput from 'components/CurrencyInput'
import CurrencyToggle from 'components/CurrencyToggle'

const prefix = '-'

const ExchangeFrom = ({
  onInputChange,
  onToggleClick,
  pockets,
  selected,
  value,
}) => (
  <div className="exchange">
    <CurrencyToggle
      onClick={onToggleClick}
      pockets={pockets}
      selected={selected}
    />
    You have
    {`${getCurrencySymbol(selected)} ${pockets[selected]}`}
    <CurrencyInput
      onChange={onInputChange}
      prefix={prefix}
      value={value}
    />
  </div>
)

ExchangeFrom.propTypes = {
  onInputChange: PropTypes.func,
  onToggleClick: PropTypes.func,
  pockets: PropTypes.object,
  selected: PropTypes.string,
  value: PropTypes.number,
}

export default ExchangeFrom
