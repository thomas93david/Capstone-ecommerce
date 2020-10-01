import React from "react";
import MovieList from "../Areas/MovieList";
import Banner from "../Areas/Banner";
import CustomerList from "../Areas/CustomerList";

const AdminPage = ({ customerlist, setCustomerList }) => {
    return (
        <>
            <CustomerList customerlist={customerlist} setCustomerList={setCustomerList} />
        </>
    );
};

export default AdminPage;
