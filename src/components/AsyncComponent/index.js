import React, { Suspense } from 'react'
import LoadingPage from '../Common/LoadingPage'

export default function asyncComponent(importComponent) {
  const C = React.lazy(importComponent)

  // use lazy loading https://reactjs.org/blog/2018/10/23/react-v-16-6.html
  const AsyncComponent = props => (
    <Suspense fallback={<LoadingPage height="100vh" />}>
      <C {...props} />
    </Suspense>
  )

  return AsyncComponent
}
