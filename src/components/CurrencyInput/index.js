import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  buildCurrencyString,
  getNumeral,
  isCurrency,
} from 'utils/currency'

class CurrencyInput extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  handleChange = e => {
    const { onChange, prefix } = this.props
    const value = e.currentTarget.value.replace(prefix, '')

    if (isCurrency(value) && onChange) {
      const numValue = getNumeral(value).value()
      onChange(numValue)
    }
  }

  render() {
    const {
      placeholder,
      prefix = '',
      readOnly = false,
      value,
    } = this.props
    const inputValue = value ? `${prefix}${buildCurrencyString(value)}` : ''

    return (
      <input
        onChange={this.handleChange}
        placeholder={placeholder}
        value={inputValue}
        readOnly={readOnly}
      />
    )
  }
}

export default CurrencyInput
