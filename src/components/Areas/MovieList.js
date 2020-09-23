import React, { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllMovies();
      console.log("Here are the Movies:", result);
      setMovies(result.allMovies);
    }
    fetchData();
  }, []);
  // let movieObj = Object.entries(movies);
  return (
    <div className="movie-container">
      <div className="movie-flex">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.rating}
            price={movie.price}
            image={movie.img_url}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
