import React from "react";
import MovieList from "../Areas/MovieList"

const MoviePage = ({customer}) => {
  return (
    <>
      <MovieList customer={customer}/>
    </>
  );
};

export default MoviePage;
