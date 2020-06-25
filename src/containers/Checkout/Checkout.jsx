import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = (props) => {
  const ingredients = useSelector((state) => state.burgerBuilder.ingredients)
  const purchased = useSelector((state) => state.order.purchased)

  const checkoutCancelledHandler = () => {
    props.history.goBack()
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  let checkoutRedirect = (
    <div>
      {purchased ? <Redirect to='/' /> : null}
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

  const ingredientsCount = Object.values(ingredients).reduce(
    (cur, sum) => sum + cur,
    0
  )
  if (ingredientsCount === 0) {
    checkoutRedirect = <Redirect to='/' />
  }

  return checkoutRedirect
}

export default Checkout
