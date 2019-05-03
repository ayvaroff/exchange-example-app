import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import config from 'config'

import {
  fromExchange,
  fromPocket,
  fromRates,
} from 'store/selectors'
import {
  makeConvertion,
  requestRates,
  setExchangeFrom,
  setExchangeTo,
  updateExchangeAmount,
} from 'store/actions'
import { ExchangeBlock } from 'components'

class App extends Component {
  static propTypes = {
    requestRates: PropTypes.func,
    setExchangeFrom: PropTypes.func,
    setExchangeTo: PropTypes.func,
    updateExchangeAmount: PropTypes.func,
  }

  componentDidMount() {
    const { requestRates } = this.props
    const { refreshRate } = config

    requestRates()
    window.setInterval(() => requestRates(), refreshRate)
  }

  componentWillUnmount() {
    clearInterval()
  }

  handleInputChange = value => {
    const { updateExchangeAmount } = this.props
    updateExchangeAmount(value)
  }

  handleToggleChange = (e, from) => {
    const {
      setExchangeFrom,
      setExchangeTo,
    } = this.props
    const {
      target: { value }
    } = e

    from ? setExchangeFrom(value) : setExchangeTo(value)
  }

  render() {
    const {
      requestRates,
      ...rest
    } = this.props

    return (
      <div className="exchange-widget">
        <div className="exchange-widget-wrapper">
          <ExchangeBlock
            onInputChange={this.handleInputChange}
            onToggleChange={this.handleToggleChange}
            {...{ ...rest }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pockets: fromPocket.getPockets(state),
  rate: fromRates.getCurrentRate(state),
  ...fromExchange.getExchangeInfo(state),
})

const mapDispatchToProps = dispatch => ({
  makeConvertion: () => dispatch(makeConvertion()),
  updateExchangeAmount: value => dispatch(updateExchangeAmount(value)),
  requestRates: () => dispatch(requestRates()),
  setExchangeFrom: value => dispatch(setExchangeFrom(value)),
  setExchangeTo: value => dispatch(setExchangeTo(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
