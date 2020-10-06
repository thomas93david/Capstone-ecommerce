import React from "react";
// import MovieList from "../Areas/MovieList";
import Banner from "../Areas/Banner";
import Slider from "../Areas/Slider";
import ImageGroup from "../Areas/ImageGroup";
import Video from "../Areas/Video";

const Home = () => {
  return (
    <div>
      <Banner />
      <Slider />
      <ImageGroup />
      <Video />
    </div>
  );
};

export default Home;
