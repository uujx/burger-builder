import React, { useState } from "react"
import { useHistory } from 'react-router-dom'
import Button from "../../../components/UI/Button/Button"
import axios from "../../../axios-orders"
import classes from "./ContactData.module.css"
import Spinner from "../../../components/UI/Spinner/Spinner"

const ContactData = (props) => {
    const [contactData, setContactData] = useState({})
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const orderHandler = () => {
        setLoading(true)
        const order = {
            ingredients: props.ingredients,
            totalPrice: props.price,
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
                setLoading(false)
                history.push("/")
            })
            .catch((err) => {
                setLoading(false)
                alert("Something went wrong!")
                console.log(err)
            })
    }

    const form = (
        <form>
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Your Email" />
            <input type="text" name="street" placeholder="Your Street" />
            <input type="number" name="zip" placeholder="Your Zip Code" />
            <Button btnType="Success" clicked={orderHandler}>
                Order
            </Button>
        </form>
    )

    return (
        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {loading ? <Spinner /> : form}
        </div>
    )
}

export default ContactData
