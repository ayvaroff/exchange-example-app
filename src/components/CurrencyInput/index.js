import React from 'react'
import PropTypes from 'prop-types'

const CurrencyInput = ({
  onChange,
  placeholder,
  prefix = '',
  value,
}) => (
  <input
    onChange={onChange}
    placeholder={placeholder}
    value={`${prefix}${value}`}
  />
)

CurrencyInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default CurrencyInput
