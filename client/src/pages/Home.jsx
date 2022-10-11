import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { loadedMovies } from "../slices/moviesReducer";

function Home() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.value);

  // fetch movies and store in redux store
  useEffect(() => {
    const fetchMovies = async () => {
      // Since the movie api requires an api key, we call our own server
      // which then fetches the movies and returns to us
      const result = await axios.get("http://localhost:5000/movies");
      // update store
      dispatch(loadedMovies(result.data.films));
    };
    fetchMovies();
  }, []);

  return (
    <>
      <h2 className="text-2xl my-4 font-bold w-full text-center">
        Book your movie tickets
      </h2>
      <h3 className="text-xl mb-4 font-bold w-full text-center">Movies</h3>
      <div className="flex justify-center flex-wrap">
        {movies.length > 1 &&
          movies.map((movie) => (
            <MovieCard movie={movie} key={movie.film_id} />
          ))}
      </div>
    </>
  );
}

export default Home;
