import React from 'react'

import { getCurrencySymbol } from 'utils/currency'

import CurrencyInput from 'components/CurrencyInput'
import CurrencyToggle from 'components/CurrencyToggle'

const ExchangeFrom = ({
  onToggleClick,
  pockets,
  selected,
}) => (
  <div className="exchange">
    <CurrencyToggle
      onClick={onToggleClick}
      pockets={pockets}
      selected={selected}
    />
    You have
    {`${getCurrencySymbol(selected)} ${pockets[selected]}`}
    <CurrencyInput />
  </div>
)

export default ExchangeFrom
