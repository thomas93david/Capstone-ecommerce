import React from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";

const MovieList = () => {
  return (
    <div className="movie-container">
      <div className="movie-flex">
        <MovieCard />
      </div>
    </div>
  );
};

export default MovieList;
