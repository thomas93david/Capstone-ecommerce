import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <>
      <div className="slider-frame">
        <figure className="image-container">
          <img src="images/StarWars1.jpg" alt="StarWars" />
          <img src="images/MarvelA1.jpg" alt="MarvelAvengers" />
          <img
            src="https://images7.alphacoders.com/683/thumb-1920-683330.jpg"
            alt="Wolf of Wall Street"
          />
          <img src="images/HarryPotter1.jpg" alt="Harry Potter" />
          <img
            src="https://images3.alphacoders.com/103/thumb-1920-1039332.jpg"
            alt="Joker"
          />
          <div className="text">Centered Text</div>
        </figure>
      </div>
      <div className="intro__text">Movies are so cool...testing</div>
    </>
  );
};

export default Banner;
