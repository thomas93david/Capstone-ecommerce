import React, { useState, useEffect } from "react";

import { getGenres } from "../../api";

import "./GenreDropdown.css";

const GenreDropdown = () => {
  const [genres, setAllGenres] = useState([]);
  const [genre, setGenre] = useState("");

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  useEffect(() => {
    async function gettingDaGenres() {
      const result = await getGenres();
      console.log("Here are the Genres:", result);
      setAllGenres(result);
    }
    gettingDaGenres();
  }, []);

  console.log("genres", genres);

  return (
    <select id="dropDown" onChange={handleGenreChange}>
      {genres.map((gString, index) => {
        return (
          <option key={index} value={gString}>
            {gString}
          </option>
        );
      })}
    </select>
  );
};

export default GenreDropdown;
