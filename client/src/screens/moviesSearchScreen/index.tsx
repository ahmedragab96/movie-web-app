import React, { useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/useStores";
import { Type } from "../../stores/moviesStore/types";
import "./styles.css";
var debounce = require('lodash.debounce');

const MoviesScreen = observer(() => {
  const { moviesStore } = useStores();
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  // generate years from 1950 till now to choose from
  const years: number[] = (function () {
    const currentYear = new Date().getFullYear(),
      years = [];
    let startYear = 1950;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  })();

  const search = async (
    text: string,
    type: Type | undefined,
    year: number | undefined
  ) => {
    await moviesStore.getMovies({
      text,
      type,
      year: year ? year : undefined,
    });
  };

  const debounceSearch = debounce(search , 500);

  return (
    <div className="movies_container">
      <div className="search_container">
        <input
          className="movies_textInput"
          placeholder="movie name"
          type={"text"}
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
            debounceSearch(e.target.value, type as Type, +year);
          }}
        />
        <div>
          <label> Year </label>
          <select
            className="input_dropdown"
            name={"year"}
            value={year}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setYear(e.target.value);
              debounceSearch(searchText, type as Type, +e.target.value);
            }}
          >
            {/* default dummy value */}
            <option value={undefined}> --- </option>
            {years.map((year) => <option value={year}> {year} </option>)}
          </select>
          <label> Type </label>
          <select
            className="input_dropdown"
            name={"type"}
            value={type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setType(e.target.value);
              debounceSearch(searchText, +e.target.value !== 0 ? e.target.value as Type : undefined, +year);
            }}
          >
            {/* default dummy value */}
            <option value={0}> --- </option>
            {Object.values(Type).map((type) => (
              <option value={type}> {type} </option>
            ))}
          </select>
        </div>
        <p style={{ color: 'red', marginTop: 15}}> { moviesStore.getMoviesError } </p>
      </div>
      <div className="cards_container">
        {moviesStore.movies.length > 0 &&
          moviesStore.movies.map((movie) => {
            return (
              <div className="movie_card">
                <img
                  src={movie.Poster}
                  alt={"poster"}
                  className={"movie_poster"}
                />
                <p className="movie_title">
                  {`${movie.Title} - ${movie.Year}`}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default MoviesScreen;
