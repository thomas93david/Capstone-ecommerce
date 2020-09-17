import React from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";

const MovieList = () => {
  return (
    <div className="movie-container">
      Lists of all movies will be generated below. Movie data will be built out
      in MovieCard
      <div className="movie-flex">
        <MovieCard />
      </div>
    </div>
  );
};

export default MovieList;
