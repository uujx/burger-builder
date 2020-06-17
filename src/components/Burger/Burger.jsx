import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const burger = (props) => {

    let ingredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredient key={ingredient+i} type={ingredient} />
            })
        })
        .reduce((sum, cur) => {
            return sum.concat(cur)
        }, [])
    
    if (ingredients.length === 0) 
        ingredients = <p>Please start building your burger!</p>

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}
export default burger
