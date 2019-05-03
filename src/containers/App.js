import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import config from 'config'

import {
  fromExchange,
  fromPocket,
} from 'store/selectors'
import {
  requestRates,
  setExchangeFrom,
  setExchangeTo,
  updateExchangeAmount,
} from 'store/actions'

import ExchangeBlock from 'components/ExchangeBlock'

class App extends Component {
  static propTypes = {
    pockets: PropTypes.object,
    requestRates: PropTypes.func,
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

  render() {
    const {
      requestRates,
      ...rest
    } = this.props

    return (
      <div>
        <ExchangeBlock
          onInputChange={this.handleInputChange}
          {...{ ...rest }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pockets: fromPocket.getPockets(state),
  ...fromExchange.getExchange(state),
})

const mapDispatchToProps = dispatch => ({
  updateExchangeAmount: value => dispatch(updateExchangeAmount(value)),
  requestRates: () => dispatch(requestRates()),
  setExchangeFrom: value => dispatch(setExchangeFrom(value)),
  setExchangeTo: value => dispatch(setExchangeTo(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
