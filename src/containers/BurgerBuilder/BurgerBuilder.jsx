import React, { Component } from 'react'
import { connect } from 'react-redux'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null
  }

//   componentDidMount() {
//     axios
//       .get('ingredients.json')
//       .then((res) => {
//         let price = this.state.totalPrice
//         for (let key in res.data) {
//           price += INGREDIENT_PRICE[key] * res.data[key]
//         }

//         this.setState({ ingredients: res.data, totalPrice: price })
//       })
//       .catch((err) => {
//         this.setState({ error: err })
//       })
//   }

  isPurchasable = (ingredients) => {
    const sum = Object.values(ingredients)
      .reduce((sum, cur) => sum + cur, 0)
      
    return sum > 0
  }

  purchaseBeginHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  render() {
    const disableInfo = { ...this.props.ings }
    for (let key in disableInfo) disableInfo[key] = disableInfo[key] === 0

    let burger = this.state.error ? (
      <p>Something went wrong: {this.state.error.message}</p>
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
            order={this.purchaseBeginHandler}
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

    if (this.state.loading) {
      orderSummary = <Spinner />
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
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
