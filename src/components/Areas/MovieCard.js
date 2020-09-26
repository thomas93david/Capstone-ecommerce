import React from "react";
import "./MovieCard.css";
import StarIcon from "@material-ui/icons/Star";

const MovieCard = ({ id, title, rating, price, image, year }) => {
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
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
