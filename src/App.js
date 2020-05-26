import React from 'react';
import { Route } from 'react-router-dom'
import Layout from './hoc//Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout'

function App() {
  return (
      <>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
        </Layout>
      </>
  );
}

export default App;
