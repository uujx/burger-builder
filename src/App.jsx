import React, { useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/AsyncComponent/AsyncComponent'

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))
  const asyncCheckout = asyncComponent(() =>
    import('./containers/Checkout/Checkout')
  )
  const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))

  useEffect(() => {
    dispatch(actions.checkAuthValidity())
  }, [])

  const routes = isAuthenticated ? (
    <Switch>
      <Route path='/checkout' component={asyncCheckout} />
      <Route path='/orders' component={asyncOrders} />
      <Route path='/auth' component={asyncAuth} />
      <Route path='/logout' component={Logout} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  ) : (
    <Switch>
      <Route path='/auth' component={asyncAuth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  )

  return <Layout>{routes}</Layout>
}

export default App
