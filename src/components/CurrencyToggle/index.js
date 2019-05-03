import React from 'react'
import PropTypes from 'prop-types'

const CurrencyToggle = ({
  onChange,
  pockets,
  selected,
}) => (
  <div className="currency-toggle">
    <select
      onChange={onChange}
      value={selected}
    >
      {Object.keys(pockets).map(key => (
        <option
          key={key}
          value={key}
        >
          {key}
        </option>
      ))}
    </select>
  </div>
)

CurrencyToggle.propTypes = {
  onChange: PropTypes.func,
  pockets: PropTypes.object,
  selected: PropTypes.string,
}

export default CurrencyToggle
