import React from "react";
import MovieList from "../Areas/MovieList";
import Banner from "../Areas/Banner";
import CustomerList from "../Areas/CustomerList";

const AdminPage = () => {
    return (
        <>
            <Banner />
            <CustomerList />
            <MovieList />
        </>

    );
};

export default AdminPage;
