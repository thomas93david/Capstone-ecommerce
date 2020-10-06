import React from "react";
import "./MovieCard.css";
import StarIcon from "@material-ui/icons/Star";
// import { getMoviesById } from "../../api";
// import { addMovieToCart } from "../../api";
// import { getCustomer } from "../../api";
import { useStateValue } from "../StateProvider";
import { ADD_TO_CART } from "../actions"

const MovieCard = ({ id, title, rating, price, image, year, loading, setCart }) => {
  const [{ cart }, dispatch] = useStateValue();
  
  // let cart2 = [];
  // const [movieArray, setMovieArray] = usestate({});

  // useEffect(() => {}, []);

  //Think of it as, everytime we click add to cart we dispatch an action
  //we listen to the action in the reducer.js
  //then it updates it
  if (loading) {
    return <h2>Loading....</h2>;
  }
  // let moviez;
  // let setCart = localStorage.setItem("cart", JSON.stringify(moviez));
  const customer = localStorage.getItem("customer");

  const addToCart = (e) => {
    //Add items to cart
    e.preventDefault();
    console.log("addToCart was hit");
    // console.log(setCart);
    //TODO Can Non Logged in Customers use this? 
    if (customer || true) {
      dispatch(
        ADD_TO_CART({
          id: id,
          title: title,
          rating: rating,
          price: price,
          year: year,
          image: image,
      }))
    } 
    // else {
    //   console.log("Or look for me:", cart);
    //   // moviez.push(setCart);
    //   //^wtf
    //   // console.log("Look for me:", movie);
    // }
  };

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
          <button onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
