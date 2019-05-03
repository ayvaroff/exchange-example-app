import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { getCurrencySymbol } from 'utils/currency'

import CurrencyInput from 'components/CurrencyInput'
import CurrencyToggle from 'components/CurrencyToggle'

const ExchangeFrom = ({
  className,
  onInputChange,
  onToggleChange,
  pockets,
  prefix,
  readOnly,
  selected,
  value,
}) => (
  <div className={cn(className, 'exchange-block-part')}>
    <div className="exchange-block-part-controls">
      <CurrencyToggle
        onChange={onToggleChange}
        pockets={pockets}
        selected={selected}
      />
      <CurrencyInput
        onChange={onInputChange}
        prefix={prefix}
        value={value}
        readOnly={readOnly}
      />
    </div>
    <div className="exchange-block-part-balance">
      Balance:&nbsp;
      {`${getCurrencySymbol(selected)} ${pockets[selected]}`}
    </div>
  </div>
)

ExchangeFrom.propTypes = {
  className: PropTypes.string,
  onInputChange: PropTypes.func,
  onToggleChange: PropTypes.func,
  pockets: PropTypes.object,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  selected: PropTypes.string,
  value: PropTypes.number,
}

export default ExchangeFrom
