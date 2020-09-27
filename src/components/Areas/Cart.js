import React, { useState, useEffect } from "react"
import { addMovieToCart } from "../../api";

const Cart = () => {
    const [cart, setCart] = useState({})
    useEffect(() => {
        async function fetchData() {
            
        }
        fetchData();
    }, []);
    return (
        <h1>Im here.</h1>
    )
}

export default Cart