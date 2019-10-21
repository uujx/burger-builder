import React from 'react'
import Aux from '../../hoc/Aux/Aux'

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ing => {
            return <li key={ing}>{ing}: {props.ingredients[ing]}</li>
        })

    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
        </Aux>
    )
}

export default orderSummary
