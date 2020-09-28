import React from "react";
import MovieList from "../Areas/MovieList"
import Pagination from "../Areas/Pagination";
const MoviePage = ({ moviesperpage, totalmovies }) => {
  return (
    <>
      <MovieList />
      <Pagination />
    </>
  );
};

export default MoviePage;
