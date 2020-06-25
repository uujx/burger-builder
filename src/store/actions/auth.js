import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expireDate')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const startExpirationTimer = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expiresIn * 1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart())

    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    const url = isSignUp
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfpf4j8kKb4U1C-NE2aNyUuIcIeXCt46Q'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfpf4j8kKb4U1C-NE2aNyUuIcIeXCt46Q'

    axios
      .post(url, authData)
      .then((res) => {
        const expireDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        )
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expireDate', expireDate)

        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(startExpirationTimer(res.data.expiresIn))
      })
      .catch((err) => {
        dispatch(authFailed(err.response.data.error))
      })
  }
}

export const checkAuthValidity = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(logout())
    } else {
      const expireDate = new Date(localStorage.getItem('expireDate'))
      if (new Date() >= expireDate) {
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(
          startExpirationTimer(
            (expireDate.getTime() - new Date().getTime()) / 1000
          )
        )
      }
    }
  }
}

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.SET_REDIRECT_PATH,
    path
  }
}
