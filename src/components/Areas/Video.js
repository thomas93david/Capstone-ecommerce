import React from "react";
import "./Video.css";

function Video() {
  return (
    <div className="video__container">
      <div className="video__holder">
        <video
          width="1440px"
          height="400px"
          src="/videos/watchingTV.mp4"
          autoPlay
          loop
          muted
        />
        <div className="content">
          <h3> movieReelz</h3>
          <i className="fas fa-theater-masks"></i>
        </div>
      </div>
    </div>
  );
}

export default Video;
