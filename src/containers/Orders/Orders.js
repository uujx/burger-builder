import React, { useState, useEffect } from "react"
import Order from "../../components/Order/Order"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get("/orders.json")
            .then((res) => {
                setLoading(false)

                console.log(res.data)
                const newOrders = []
                for (let key in res.data) {
                    newOrders.push({
                        id: key,
                        ingredients: res.data[key].ingredients,
                        price: res.data[key].totalPrice
                    })
                }

                setOrders(newOrders)
            })
            .catch((err) => {
                setLoading(false)
            })
    }, [])

    let data = orders.map((order) => {
        return (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />
        )
    })
    if (loading) {
        data = <Spinner />
    }
    return <div>{data}</div>
}

export default withErrorHandler(Orders, axios)
