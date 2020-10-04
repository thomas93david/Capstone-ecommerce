import React from "react";
import MovieList from "../Areas/MovieList";
import Banner from "../Areas/Banner";

const Home = ({customer}) => {
  return (
    <>
      <Banner />
      <MovieList customer={customer} />
    </>
  );
};

export default Home;
