import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import numeral from 'numeral'

import {
  fromExchange,
  fromPocket,
} from 'store/selectors'
import {
  requestRates,
  setExchangeFrom,
  setExchangeTo,
} from 'store/actions'
import { isCurrency } from 'utils/currency'

import ExchangeBlock from 'components/ExchangeBlock'

class App extends Component {
  static propTypes = {
    pockets: PropTypes.object,
    requestRates: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      amount: numeral(10043.07).format('$0,0.00')
    }
  }

  componentDidMount() {
    const { requestRates } = this.props
    requestRates()
  }

  handleInputChange = e => {
    const value = e.currentTarget.value.replace('-', '')
    if (!isCurrency(value)) return

    this.setState({ amount: numeral(value).format('$0,0.00') })
  }

  render() {
    const {
      requestRates,
      ...rest
    } = this.props

    return (
      <div>
        <ExchangeBlock {...{ ...rest }} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pockets: fromPocket.getPockets(state),
  ...fromExchange.getExchange(state),
})

const mapDispatchToProps = dispatch => ({
  requestRates: () => dispatch(requestRates()),
  setExchangeFrom: value => dispatch(setExchangeFrom(value)),
  setExchangeTo: value => dispatch(setExchangeTo(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
