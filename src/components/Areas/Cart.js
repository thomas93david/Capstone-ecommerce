import React, { useState, useEffect } from "react"
import { createCart } from "../../../db";
import { addMovieToCart } from "../../api";




const Cart = () => {

    const [cart, setCart] = useState({})

    useEffect(() => {
        async function fetchData() {
            const result = await createCart();
            console.log("Here are the carts:", result);
            setCart(result);
        }
        fetchData();
    }, []);



    useEffect(() => {
        async function fetchData() {
            const result = await addMovieToCart()
        }

    }, [])



    return (
        <h1>Im here.</h1>
    )
}

export default Cart