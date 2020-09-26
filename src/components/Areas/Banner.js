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
            src="https://images8.alphacoders.com/815/thumb-1920-815755.jpg"
            alt="BlackPanther"
          />
          <img src="images/HarryPotter1.jpg" alt="Harry Potter" />
          <img
            src="https://images3.alphacoders.com/103/thumb-1920-1039332.jpg"
            alt="Wall-E"
          />
        </figure>
      </div>
    </>
  );
};

export default Banner;
