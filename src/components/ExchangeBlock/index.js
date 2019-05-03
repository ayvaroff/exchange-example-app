import React, { Component } from 'react'

import ExchangeFrom from 'components/ExchangeFrom'
import ExchangeTo from 'components/ExchangeTo'

class ExchangeBlock extends Component {

  handleChange = e => {

  }

  render() {
    const {
      exchangeFrom,
      exchangeTo,
      pockets,
      setExchangeFrom,
      setExchangeTo,
    } = this.props

    return (
      <div className="exchange">
        <ExchangeFrom
          onToggleClick={setExchangeFrom}
          pockets={pockets}
          selected={exchangeFrom}
        />
        <ExchangeTo
          onToggleClick={setExchangeTo}
          pockets={pockets}
          selected={exchangeTo}
        />
      </div>
    )
  }
}

export default ExchangeBlock
