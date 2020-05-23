import React, { Component } from "react"

import Aux from "../../hoc/Aux/Aux"
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
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
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
        // alert("Continue to purchase!")
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: "Stanis",
                email: "test@test.com",
                address: {
                    state: "test state",
                    county: "test county",
                    street: "test street 1",
                    zip: "123456",
                },
                phone: 1231231231,
            },
        }
        axios
            .post("orders.json", order)
            .then((res) => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch((err) => {
                this.setState({ loading: false, purchasing: false })
                alert("Something went wrong!")
                console.log(err)
            })
    }

    render() {
        const disableInfo = { ...this.state.ingredients }
        for (let key in disableInfo) disableInfo[key] = disableInfo[key] === 0

        let orderSummary = (
            <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                cancelled={this.purchaseCancelHandler}
                continued={this.purchaseContinueHandler}
            />
        )
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    purchaseCancelled={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                
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
    }
}

export default BurgerBuilder
