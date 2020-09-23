import React, { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../api"

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  useEffect(() => {
    async function fetchData() {
      const result = await getAllMovies();
      console.log("looking for result", result)
      setMovies(result)
    }
    fetchData()
  }, []);
  let movieObj = Object.entries(movies)
  return (

    <div className="movie-container" >
      <div className="movie-flex" >
        {
          movieObj.map((movies) => {

            return (<MovieCard key={movies.id} movies={movies} />
            )
          })
        }

      </div>
    </div>
  );
};

export default MovieList;
