import React from 'react';
import { Route } from 'react-router-dom'
import Layout from './hoc//Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Aux from './hoc/Aux/Aux'
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
      <Aux>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
        </Layout>
      </Aux>
  );
}

export default App;
