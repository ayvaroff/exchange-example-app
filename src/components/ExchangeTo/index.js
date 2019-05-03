import React from 'react'

import { getCurrencySymbol } from 'utils/currency'

import CurrencyInput from 'components/CurrencyInput'
import CurrencyToggle from 'components/CurrencyToggle'

const ExchangeTo = ({
  onToggleClick,
  pockets,
  selected,
}) => (
  <div className="exchange">
    You have
    {`${getCurrencySymbol(selected)} ${pockets[selected]}`}
    <CurrencyInput />
    <CurrencyToggle
      onClick={onToggleClick}
      pockets={pockets}
      selected={selected}
    />
  </div>
)

export default ExchangeTo
