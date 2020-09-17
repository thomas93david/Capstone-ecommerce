import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import "./MovieCard.css";

const MovieCard = () => {
  return (
    <div className="movie-card">
      <CardDeck>
        <Card>
          <Card.Img
            style={{ padding: "18px" }}
            src="https://picsum.photos/150/200"
          />
          <Card.Body>
            <Card.Title>Movie Title</Card.Title>
            <Card.Text>Movie Genre</Card.Text>
            <Card.Text>Movie Despcription</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">$$$$</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img
            style={{ padding: "18px" }}
            src="https://picsum.photos/150/200"
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>Movie Genre</Card.Text>
            <Card.Text>Movie Despcription</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">$$$$</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img
            style={{ padding: "18px" }}
            src="https://picsum.photos/150/200"
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>Movie Genre</Card.Text>
            <Card.Text>Movie Despcription</Card.Text>
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
