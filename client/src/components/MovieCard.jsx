import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  // renders movie image and title
  return (
    <Link
      to={`movie/${movie.film_id}`}
      className="m-4 overflow-hidden w-52 rounded-md text-wrap"
    >
      <div className="overflow-hidden h-40 w-52">
        <img
          src={movie.images.poster[1]?.medium?.film_image}
          alt="movie poster"
        />
      </div>
      <h4 className="font-semibold mt-1">{movie.film_name} </h4>
    </Link>
  );
}

export default MovieCard;
