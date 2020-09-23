import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import "./MovieCard.css";

const MovieCard = ({ movies }) => {
  console.log("is this is the movies", movies[1])
  const getTheFucker = movies[1]
  const getit = getTheFucker.map((movie) => {
    return movie

  })
  console.log("sounds like fun", getit)


  return (
    <div className="movie-card">
      <CardDeck>
        <Card>
          <Card.Img
            style={{ padding: "18px" }}
            src={movies.img_url}
          />
          <Card.Body>
            <Card.Title>{movies.title}</Card.Title>
            <Card.Text>{movies.rating}</Card.Text>
            <Card.Text>{movies.price}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">$$$$</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </div>
  );
};

export default MovieCard;
