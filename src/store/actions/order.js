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
  return (dispatch, getState) => {
    dispatch(purchaseBurgerStart())

    const token = getState().auth.token
    axios
      .post('orders.json?auth=' + token, order)
      .then((res) => {
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
  return (dispatch, getState) => {
    // Use getState to decide whether to fetch orders or use the cached one
    if (!getState().order.firstLaunch) {
      return
    }

    dispatch(fetchOrdersStart())

    const token = getState().auth.token
    const userId = getState().auth.userId
    const queryParams = `?auth=${token}&orderBy="uid"&equalTo="${userId}"`
    axios
      .get('/orders.json' + queryParams)
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
