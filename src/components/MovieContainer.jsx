import React from "react";

const MovieContainer = ({ img, title }) => {
  return (
    <div className="transition duration-500 ease-in-out transform shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-2xl">
      <img
        src={`https://image.tmdb.org/t/p/w500${img}`}
        alt={title}
        className="w-full h-full rounded-lg cursor-pointer img bg-red"
      />
    </div>
  );
};

export default MovieContainer;
