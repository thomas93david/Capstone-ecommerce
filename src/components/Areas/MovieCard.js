import React from "react";
import "./MovieCard.css";
import StarIcon from "@material-ui/icons/Star";
// import { getMoviesById } from "../../api";
// import { addMovieToCart } from "../../api";
// import { getCustomer } from "../../api";
import { useStateValue } from "../StateProvider";
import { addMovieToDBCart } from "../../api";

const MovieCard = ({ id, title, rating, price, image, year, movies, loading, customer }) => {
  const [{ cart }, dispatch] = useStateValue();

  //Think of it as, everytime we click add to cart we dispatch an action
  //we listen to the action in the reducer.js
  //then it updates it
  if (loading) {
    return <h2>Loading....</h2>
  }
  const addToCart = () => {
    //Add items to cart
    console.log("adding to da cart");
    dispatch({
      type: "ADD_TO_CART",
      movie: {
        id: id,
        title: title,
        rating: rating,
        price: price,
        year: year,
        image: image,
      },
    });
  };

  const addToDB = (id) => {
    console.log("heard on button");
    addMovieToDBCart(id);
  }

  const addHandler = (id) => {
    addToCart();
    console.log("customer info", customer);
    addToDB(id);
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
              .map((_, i) => (
                <StarIcon className="star__icon" />
              ))}
          </div>
          <button onClick={addHandler}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
