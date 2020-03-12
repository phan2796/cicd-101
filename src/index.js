import React from 'react'
import { render } from 'react-dom'
import store, { history } from './store'
import routes from './routes'
import './index.css';

const target = document.getElementById('root')

// @see https://github.com/davezuko/react-redux-starter-kit/blob/master/src/main.js
let renderApp = () => {
  const App = require('./App').default

  render(<App store={store} history={history} routes={routes} />, target)
}

// @see https://github.com/facebook/create-react-app/issues/2317
if (module.hot) {
  module.hot.accept(['./App', './routes'], () => {
    renderApp()
  })
}

renderApp()
