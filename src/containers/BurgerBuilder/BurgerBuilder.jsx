import React, { Component } from 'react'
import { connect } from 'react-redux'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients()
    this.props.onSetRedirectPath('/')
  }

  isPurchasable = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, cur) => sum + cur, 0)
    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit()
    this.props.history.push('/checkout')
  }

  render() {
    const disableInfo = { ...this.props.ings }
    for (let key in disableInfo) disableInfo[key] = disableInfo[key] === 0

    let burger = this.props.error ? (
      <p>Something went wrong: {this.props.error.message}</p>
    ) : (
      <Spinner />
    )

    let orderSummary = <Spinner />
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredients={this.props.ings}
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disableInfo={disableInfo}
            price={this.props.price}
            purchasable={this.isPurchasable(this.props.ings)}
            order={this.purchaseHandler}
          />
        </>
      )
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          cancelled={this.purchaseCancelHandler}
          continued={this.purchaseContinueHandler}
        />
      )
    }

    return (
      <>
        <Modal show={this.state.purchasing} cancel={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseBurgerInit()),
    onSetRedirectPath: (path) => dispatch(actions.setRedirectPath(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
