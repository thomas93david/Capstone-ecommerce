import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <>
      <div className="slider-frame">
        <figure className="image-container">
          <img src="images/StarWars1.jpg" alt="StarWars" />
          <img src="images/MarvelA1.jpg" alt="MarvelAvengers" />
          <img src="images/BlackPanther1.png" alt="BlackPanther" />
          <img src="images/HarryPotter1.jpg" alt="Harry Potter" />
          <img src="images/WallE.1.jpg" alt="Wall-E" />
        </figure>
      </div>
    </>
  );
};

export default Banner;
