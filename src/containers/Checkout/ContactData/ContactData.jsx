import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'

const ContactData = (props) => {
  // ****************************States****************************
  const ingredients = useSelector((state) => state.burgerBuilder.ingredients)
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice)
  const loading = useSelector((state) => state.order.loading)
  const userId = useSelector((state) => state.auth.userId)
  const [formValidity, setFormValidity] = useState(false)
  const dispatch = useDispatch()

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      value: '',
      config: {
        name: 'name',
        type: 'text',
        placeholder: 'Enter your name'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      value: '',
      config: {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email'
      },
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    address: {
      elementType: 'input',
      value: '',
      config: {
        name: 'address',
        type: 'text',
        placeholder: 'Enter your address'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zip: {
      elementType: 'input',
      value: '',
      config: {
        name: 'zip',
        type: 'number',
        placeholder: 'Enter your zip code'
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    phone: {
      elementType: 'input',
      value: '',
      config: {
        name: 'phone',
        type: 'number',
        placeholder: 'Enter your phone number'
      },
      validation: {
        required: true,
        minLength: 8,
        maxLength: 12
      },
      valid: false,
      touched: false
    },
    deliverMethod: {
      elementType: 'select',
      value: 'fastest',
      config: {
        name: 'deliverMethod',
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      validation: {
        required: true
      },
      valid: true,
      touched: false
    }
  })

  // ****************************Event Handler****************************

  const onInputChange = (key, event) => {
    const updatedForm = { ...orderForm }
    const updatedElement = { ...orderForm[key] }
    updatedElement.value = event.target.value

    // check field Validity
    updatedElement.valid = checkValidity(
      updatedElement.value,
      updatedElement.validation
    )
    updatedElement.touched = true

    updatedForm[key] = updatedElement
    setOrderForm(updatedForm)

    // check form validity
    let formIsValid = true
    for (let key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid
    }
    setFormValidity(formIsValid)
  }

  const orderHandler = (event) => {
    event.preventDefault()

    const user = {}
    for (let key in orderForm) {
      user[key] = orderForm[key].value
    }

    const order = {
      ingredients,
      totalPrice,
      user,
      uid: userId
    }

    dispatch(actions.purchaseBurger(order))
  }

  // ****************************Construction****************************

  const inputElements = Object.entries(orderForm).map(([key, el]) => {
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
    <form>
      {inputElements}
      <Button
        btnType='Success'
        clicked={(e) => orderHandler(e)}
        disabled={!formValidity}>
        Order
      </Button>
    </form>
  )

  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Data</h4>
      {loading ? <Spinner /> : form}
    </div>
  )
}

export default withErrorHandler(ContactData, axios)
