import React, { useState, useEffect } from "react";
import { customerList } from "../../api"
import "./CustomerList.css"


const CustomerList = () => {
    const [customerlist, setCustomerList] = useState([])
    useEffect(() => {
        async function fetchData() {
            const result = await customerList();
            console.log("Here are the Customers:", result.customers);
            setCustomerList(result.customers);
        }
        fetchData();

    }, [])

    return (
        <div className="customerList">
            <h1>
                Here are the Customers we currently have.
            </h1>
            {customerlist.map((customer, index) => (
                <div key={index}>
                    <h3>{customer.username}</h3>
                    <p>{customer.isAdmin}</p>
                    <div>{customer.cart}</div>
                </div>
            ))
            }

        </div>
    )
}
export default CustomerList
