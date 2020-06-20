import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

const Orders = () => {
  const loading = useSelector((state) => state.order.loading)
  const orders = useSelector((state) => state.order.orders)
  const firstLaunch = useSelector((state) => state.order.firstLaunch)
  const dispatch = useDispatch()

  useEffect(() => {
    if (firstLaunch) {
      dispatch(actions.fetchOrders())
    }
  }, [])

  let data = orders.map((order) => {
    return (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    )
  })
  if (loading) {
    data = <Spinner />
  }
  return <div>{data}</div>
}

export default withErrorHandler(Orders, axios)
