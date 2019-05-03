import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'
import rootSaga from './sagas'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(middleware))
  }
  return applyMiddleware(middleware)
}

const middleware = createSagaMiddleware()

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware(middleware),
  )

  middleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers')))
  }

  return store
}

export default configureStore
