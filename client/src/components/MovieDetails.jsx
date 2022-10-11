import React from "react";

function MovieDetails({ filmDetails }) {
  // renders movie image, title, cast and synopsis
  return (
    <>
      <div className="overflow-hidden h-40 w-52">
        <img
          src={filmDetails?.images?.poster[1]?.medium?.film_image}
          alt="film poster"
        />
      </div>
      <p className="text-lg font-bold my-4">{filmDetails?.film_name} </p>
      <p className="font-bold">Cast members:</p>
      <ul>
        {filmDetails?.cast?.map((member, index) => (
          <li key={index} className="font-semibold ml-4 my-1">
            {" "}
            {member.cast_name}
          </li>
        ))}
      </ul>

      <p className="font-bold mt-4">Synopsis:</p>
      <p>{filmDetails.synopsis_long}</p>
    </>
  );
}

export default MovieDetails;
