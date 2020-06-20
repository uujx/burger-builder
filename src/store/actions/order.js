import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    order: {
      ingredients: order.ingredients,
      price: order.totalPrice,
      id
    }
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error
  }
}

export const purchaseBurger = (order) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart())

    axios
      .post('orders.json', order)
      .then((res) => {
        console.log(res)
        dispatch(purchaseBurgerSuccess(res.data.name, order))
      })
      .catch((err) => {
        dispatch(purchaseBurgerFailed(err))
      })
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error
  }
}

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart())

    axios
      .get('/orders.json')
      .then((res) => {
        const fetchedOrders = []
        for (let key in res.data) {
          fetchedOrders.push({
            id: key,
            ingredients: res.data[key].ingredients,
            price: res.data[key].totalPrice
          })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err))
      })
  }
}
