import React, { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../api";
import { addMovieToCart } from "../../api"
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
  return (
    <div className="movie-container">
      <div className="movie-flex">
        {movies.map((movie, index) => (
          <MovieCard
            movies={movies}
            id={movie.id}
            setMovies={setMovies}
            key={index}
            title={movie.title}
            year={movie.year}
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
