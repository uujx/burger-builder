import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux' 
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredient = (type) => {
        let ingredients = {...this.state.ingredients}
        ingredients[type] += 1
        this.setState(prevState => {
            return {
                ingredients,
                totalPrice: prevState.totalPrice + INGREDIENT_PRICE[type]
            }
        })
        this.updatePurchasable(ingredients)
    }

    removeIngredient = (type) => {
        let ingredients = {...this.state.ingredients}
        if (ingredients[type] === 0)
            return
        ingredients[type] -= 1
        this.setState(prevState => {
            return {
                ingredients,
                totalPrice: prevState.totalPrice - INGREDIENT_PRICE[type]
            }
        })
        this.updatePurchasable(ingredients)
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ing => ingredients[ing])
            .reduce((sum, cur) => sum + cur, 0)
        this.setState({purchasable: sum > 0})
    }

    order = () => {
        this.setState({purchasing: true})
    }

    closeModal = () => {
        this.setState({purchasing: false})
    }

    render() {
        const disableInfo = {...this.state.ingredients}
        for (let key in disableInfo)
            disableInfo[key] = disableInfo[key] === 0

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.closeModal}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredients={this.state.ingredients} 
                    addIngredient={this.addIngredient} 
                    removeIngredient={this.removeIngredient}
                    disableInfo={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.order}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder
