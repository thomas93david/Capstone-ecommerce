import React from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { Card } from "react-bootstrap";

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
