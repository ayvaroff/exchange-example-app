import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CurrencyFormat from 'react-currency-format'

class CurrencyInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    prefix: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  handleChange = e => {
    const { onChange } = this.props
    const value = Math.abs(e.floatValue) || 0
    onChange && onChange(value)
  }

  render() {
    const {
      prefix = '',
      readOnly = false,
      value,
    } = this.props

    return (
      <CurrencyFormat
        allowNegative={false}
        autoFocus={!readOnly}
        className="currency-input"
        decimalScale={2}
        displayType={readOnly ? 'text' : 'input'}
        onValueChange={this.handleChange}
        prefix={prefix}
        thousandSeparator
        value={value || ''}
      />
    )
  }
}

export default CurrencyInput
