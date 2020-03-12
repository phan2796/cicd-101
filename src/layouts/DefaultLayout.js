import React from 'react'
import { Route } from 'react-router-dom'

/**
 * @see https://simonsmith.io/reusing-layouts-in-react-router-4/
 * but don't use extends for now because it causes re-render <Component/> when redux state changes
 */
const DefaultLayout = ({ component: Component, ...rest }) => (
  <Route {...rest} render={matchProps => <Component {...matchProps} />} />
)

export default DefaultLayout
