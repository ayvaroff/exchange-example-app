import React from 'react'
import PropTypes from 'prop-types'

import { getCurrencySymbol } from 'utils/currency'

import CurrencyInput from 'components/CurrencyInput'
import CurrencyToggle from 'components/CurrencyToggle'

const prefix = '+'

const ExchangeTo = ({
  onToggleClick,
  pockets,
  selected,
  value,
}) => (
  <div className="exchange">
    You have
    {`${getCurrencySymbol(selected)} ${pockets[selected]}`}
    <CurrencyInput
      prefix={prefix}
      readOnly
      value={value}
    />
    <CurrencyToggle
      onClick={onToggleClick}
      pockets={pockets}
      selected={selected}
    />
  </div>
)

ExchangeTo.propTypes = {
  onToggleClick: PropTypes.func,
  pockets: PropTypes.object,
  selected: PropTypes.string,
  value: PropTypes.number,
}

export default ExchangeTo
