import * as actionTypes from '../actions/actionTypes'

const initialState = {
  orders: [],
  firstLaunch: true,
  loading: false,
  error: null,
  purchased: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return {
        ...state,
        purchased: false
      }

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
        error: null
      }

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat(action.order),
        loading: false,
        error: null,
        purchased: true
      }

    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        error: action.error
      }

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
        firstLaunch: false
      }

    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      return state
  }
}

export default reducer
