import React from "react";
import { Card } from "react-bootstrap";
import "./MovieCard.css";

const MovieCard = ({ title, rating, price, image }) => {
  return (
    <div className="movie-card">
      <img src={image} className="img" />
      <div className="movie-card-layer_top">
        <div className="movie-card-text">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>Rating: {rating}/10</Card.Text>
            <Card.Text>Buy:{price}</Card.Text>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
