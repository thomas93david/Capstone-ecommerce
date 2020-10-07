import React from "react";
import "./Slider.css";

function Slider() {
  return (
    <div className="slider__container">
      <div className="slider__image">
        <img src="images/sliderD.jpg" alt="Mulan" />
        <div class="text-block">
          <h4>ACTION</h4>
        </div>
      </div>
      <div className="slider__image">
        <img src="images/slideG.jpg" alt="LionKing" />
        <div class="text-block">
          <h4>ADVENTURE</h4>
        </div>
      </div>
      <div className="slider__image">
        <img src="images/sliderH.jpg" alt="JL" />
        <div class="text-block">
          <h4>ROMANCE</h4>
        </div>
      </div>
      <div className="slider__image">
        <img src="images/sliderF.jpg" alt="Big6" />
        <div class="text-block">
          <h4>ANIMATION</h4>
        </div>
      </div>
    </div>
  );
}

export default Slider;
