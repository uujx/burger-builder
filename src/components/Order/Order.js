import React from "react"
import classes from "./Order.module.css"

const Order = (props) => {
    const ingredients = Object.entries(props.ingredients).map(
        ([key, value], index) => (
            <span key={index} className={classes.Ingredient}>
                {key}: {value}
            </span>
        )
    )

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>$ {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
