import React, { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../api";

const MovieList = ({ customer }) => {
  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllMovies();
      console.log("Here are the Movies:", result);
      setMovies(result.allMovies);
    }
    fetchData();
  }, []);

  return (
    <>
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
              customer={customer}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
