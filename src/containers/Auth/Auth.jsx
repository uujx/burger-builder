import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'
import styles from './Auth.module.css'

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const redirectPath = useSelector((state) => state.auth.redirectPath)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [userCredential, setUserCredential] = useState({
    email: {
      elementType: 'input',
      value: '',
      config: {
        name: 'email',
        type: 'email',
        placeholder: 'Email'
      },
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      value: '',
      config: {
        name: 'password',
        type: 'password',
        placeholder: 'Password'
      },
      validation: {
        required: true,
        minLength: 6,
        maxLength: 20
      },
      valid: false,
      touched: false
    }
  })

  const onInputChange = (key, event) => {
    const updatedForm = { ...userCredential }
    const updatedElement = { ...userCredential[key] }
    updatedElement.value = event.target.value

    // check field Validity
    updatedElement.valid = checkValidity(
      updatedElement.value,
      updatedElement.validation
    )
    updatedElement.touched = true

    updatedForm[key] = updatedElement
    setUserCredential(updatedForm)

    // check form validity
    let formIsValid = true
    for (let key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid
    }
    setIsFormValid(formIsValid)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    dispatch(
      actions.auth(
        userCredential.email.value,
        userCredential.password.value,
        isSignUp
      )
    )
  }

  const switchHandler = () => {
    setIsSignUp(!isSignUp)
  }

  function checkValidity(value, rules) {
    if (rules.required && value.trim() === '') {
      return false
    }

    if (
      rules.isEmail &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ) {
      return false
    }

    if (rules.minLength && value.length < rules.minLength) {
      return false
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return false
    }

    return true
  }

  const inputElements = Object.entries(userCredential).map(([key, el]) => {
    return (
      <Input
        key={key}
        eleType={el.elementType}
        value={el.value}
        config={el.config}
        valid={el.valid}
        touched={el.touched}
        changed={(e) => onInputChange(key, e)}
      />
    )
  })

  const form = (
    <form onSubmit={(e) => submitHandler(e)}>
      {inputElements}
      <Button btnType='Success' disabled={!isFormValid}>
        Submit
      </Button>
    </form>
  )

  return (
    <div className={styles.Auth}>
      {isAuthenticated ? <Redirect to={redirectPath} /> : null}
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <p>{error ? error.message : null}</p>
      {loading ? <Spinner /> : form}{' '}
      <Button btnType='Danger' clicked={switchHandler}>
        Switch to {isSignUp ? 'Login' : 'SignUp'}
      </Button>
    </div>
  )
}

export default Auth
