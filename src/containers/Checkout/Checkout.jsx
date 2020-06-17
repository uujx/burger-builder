import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = (props) => {
  const ingredients = useSelector((state) => state.ingredients)

  const checkoutCancelledHandler = () => {
    props.history.goBack()
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />

      <Route
        path={`${props.match.path}/contact-data`}
        component={ContactData}
      />
    </div>
  )
}

export default Checkout
