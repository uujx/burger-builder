import React, { useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders'
import Checkout from './containers/Checkout/Checkout'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.checkAuthValidity())
  }, [])

  const routes = isAuthenticated ? (
    <Switch>
      <Route path='/checkout' component={Checkout} />
      <Route path='/orders' component={Orders} />
      <Route path='/logout' component={Logout} />
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  ) : (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  )

  return <Layout>{routes}</Layout>
}

export default App
