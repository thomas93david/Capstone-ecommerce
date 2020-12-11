import React from "react";
import "./ImageGroup.css";

function ImageGroup() {
  return (
    <div id="image__group__wrap">
      <div className="image__bar__one">
        <h2>SELECT FROM HUNDREDS OF MOVIES</h2>
      </div>
      <div className="image__bar__two">
        <div className="image__item1">
          <h2>FANASTY</h2>
        </div>
        <div className="image__item2">
          <h2>COMEDY</h2>
        </div>
        <div className="image__item3">
          <h2>THRILLER</h2>
        </div>
      </div>
    </div>
  );
}

export default ImageGroup;
