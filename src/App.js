import React from 'react';
import Layout from './hoc//Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Aux from './hoc/Aux/Aux'

function App() {
  return (
      <Aux>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </Aux>
  );
}

export default App;
