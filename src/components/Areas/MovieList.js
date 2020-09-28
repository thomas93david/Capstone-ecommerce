import React, { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../api";
import { addMovieToCart } from "../../api"
import { TrainOutlined, TrendingUpRounded } from "@material-ui/icons";
import Pagination from "./Pagination";
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setcurrentpage] = useState(1);
  const [moviesperpage, setmoviesperpage] = useState(10);




  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const result = await getAllMovies();
      console.log("Here are the Movies:", result);
      setMovies(result.allMovies);
      setLoading(false)
    }
    fetchData();
  }, []);
  if (loading) {
    return <h2>Loading....</h2>
  }
  const indexOfLastMovie = currentpage * moviesperpage;
  const indexOfFirstMovie = indexOfLastMovie - moviesperpage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie)
  console.log("this is the current movies", currentMovies)
  const paginate = pageNumber => setcurrentpage(pageNumber);
  return (
    <>
      <div className="movie-container">
        <div className="movie-flex">
          {currentMovies.map((movie, index) => (
            <MovieCard
              movies={currentMovies}
              totalmovies={movies.length}
              moviesperpage={moviesperpage}
              loading={loading}
              id={movie.id}
              setMovies={setMovies}
              key={index}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              price={movie.price}
              image={movie.img_url}
            />
          ))
          }
        </div>

      </div>
      <Pagination moviesperpage={moviesperpage} totalmovies={movies.length} paginate={paginate} />
    </>
  );
};

export default MovieList;
