import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import createRootReducer from './reducers'
// import { intlInitialState } from './reducers/i18n'

export const history = createBrowserHistory({
  basename: process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '/'
})

const initialState = {
  // intl: intlInitialState
}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

// @see https://github.com/facebook/create-react-app/issues/2317
const store = createStore(
  createRootReducer(history),
  initialState,
  composedEnhancers
)

store.asyncReducers = {}

export const injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer
  store.replaceReducer(createRootReducer(history, store.asyncReducers))
}

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history, store.asyncReducers))
    })
  }
}

export default store
