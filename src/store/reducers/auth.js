import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  token: null,
  userId: null,
  error: null,
  isAuthenticated: false,
  redirectPath: '/'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      }

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
        userId: action.userId,
        isAuthenticated: true
      }

    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userId: null,
        expireDate: null
      }

    case actionTypes.SET_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: action.path
      }

    default:
      return state
  }
}

export default reducer
