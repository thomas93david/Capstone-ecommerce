import React, { useEffect, useState } from "react";
import "./MovieCard.css";
import StarIcon from "@material-ui/icons/Star";
import { getMoviesById } from "../../api";
import { addMovieToCart } from "../../api"
import { getCustomer } from "../../api"
const MovieCard = ({ id, title, rating, price, image, year }) => {
  const [singleMovie, setSingleMovie] = useState({})

  const addMovieHandler = () => {
    async function fetchNewData() {
      const customer = await getCustomer()
      console.log("come on please customer.....", customer.data.customer.id)
      const movie = await getMoviesById(id)

      console.log("this is getting the movie id i hope..", movie.id)
      const result = await addMovieToCart(movie.id, customer.data.customer.id, 1)
      console.log("this is the added movie", result)
      setSingleMovie(result)
    }
    fetchNewData()
  }
  return (
    <div className="movie-card">
      <img src={image} className="img" alt={title} />
      <div className="movie-card-layer_top">
        <div className="movie-card-text">
          <p>{title}</p>
          <p>{year}</p>
          <strong>{price}</strong>
          <div className="movie__rating">
            {Array(rating)
              .fill()
              .map((_) => (
                <StarIcon className="star__icon" />
              ))}
          </div>
          <button onClick={addMovieHandler}>add a movie</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
