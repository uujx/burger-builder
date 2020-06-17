import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState({})
    const [price, setPrice] = useState(0)

    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const newIngredients = {}

        for (let [key, value] of query) {
            if (key === "price") {
                setPrice(+value)
            } else {
                newIngredients[key] = +value
            }
        }

        setIngredients(newIngredients)
    }, [])

    const checkoutCancelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace("/checkout/contact-data")
    }

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />

            <Route
                path={`${props.match.path}/contact-data`}
                render={() => <ContactData ingredients={ingredients} price={price}/>}
            />
        </div>
    )
}

export default Checkout
