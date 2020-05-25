import React, { Component } from "react"

import Aux from "../../hoc/Aux/Aux"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null,
    }

    componentDidMount() {
        axios
            .get("ingredients.json")
            .then((res) => {
                this.setState({ ingredients: res.data })
            })
            .catch((err) => {
                this.setState({ error: err })
            })
    }

    addIngredient = (type) => {
        let ingredients = { ...this.state.ingredients }
        ingredients[type] += 1
        this.setState((prevState) => {
            return {
                ingredients,
                totalPrice: prevState.totalPrice + INGREDIENT_PRICE[type],
            }
        })
        this.updatePurchasable(ingredients)
    }

    removeIngredient = (type) => {
        let ingredients = { ...this.state.ingredients }
        if (ingredients[type] === 0) return
        ingredients[type] -= 1
        this.setState((prevState) => {
            return {
                ingredients,
                totalPrice: prevState.totalPrice - INGREDIENT_PRICE[type],
            }
        })
        this.updatePurchasable(ingredients)
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((ing) => ingredients[ing])
            .reduce((sum, cur) => sum + cur, 0)
        this.setState({ purchasable: sum > 0 })
    }

    purchaseBeginHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // "salad=1&cheese=1"
        const queryParams = Object.entries(this.state.ingredients)
            .reduce((arr, [key, value]) => {
                return arr.concat(key + "=" + value)
            }, [])
            .join("&")

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryParams
        })
    }

    render() {
        const disableInfo = { ...this.state.ingredients }
        for (let key in disableInfo) disableInfo[key] = disableInfo[key] === 0

        let burger = this.state.error ? (
            <p>Something went wrong: {this.state.error.message}</p>
        ) : (
            <Spinner />
        )
        let orderSummary = <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredients={this.state.ingredients}
                        addIngredient={this.addIngredient}
                        removeIngredient={this.removeIngredient}
                        disableInfo={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.purchaseBeginHandler}
                    />
                </Aux>
            )
            orderSummary = (
                <OrderSummary
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    cancelled={this.purchaseCancelHandler}
                    continued={this.purchaseContinueHandler}
                />
            )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    cancel={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
