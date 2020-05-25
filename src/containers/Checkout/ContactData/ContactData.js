import React, { useState } from "react"
import Button from "../../../components/UI/Button/Button"
import axios from '../../../axios-orders'
import classes from './ContactData.module.css'

const ContactData = () => {
    const [contactData, setContactData] = useState({})

    const orderHandler = () => {
        this.setState({ loading: true })
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

    return (
        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Your Street" />
                <input type="number" name="zip" placeholder="Your Zip Code" />
                <Button btnType="Success" clicked={orderHandler}>
                    Order
                </Button>
            </form>
        </div>
    )
}

export default ContactData
