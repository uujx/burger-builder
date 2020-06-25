import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ing => {
            return <li key={ing}>{ing}: {props.ingredients[ing]}</li>
        })

    return (
        <>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to purchase?</p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </>
    )
}

export default OrderSummary
