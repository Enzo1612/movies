import React from "react";

function MovieDetails({
  title,
  image,
  details,
  date,
  popularity,
  runtime,
  tagline,
}) {
  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-y-hidden">
      <div className="flex w-full max-w-sm mx-4 overflow-hidden rounded-lg shadow-md sm:mx-auto">
        <div className="relative overflow-hidden text-white transition duration-500 ease-in-out transform shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-2xl movie-item movie-card">
          <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
          <div
            className="relative z-10 px-10 pt-10 space-y-6 cursor-pointer group movie_info"
            data-lity=""
            href="https://www.youtube.com/embed/aSHs224Dge0"
          >
            <div className="w-full poster__info align-self-end">
              <div className="h-32"></div>
              <div className="space-y-6 detail_info">
                <div className="flex flex-col space-y-2 inner">
                  <h3
                    className="text-2xl font-bold text-white"
                    data-unsp-sanitized="clean"
                  >
                    {title}
                  </h3>
                  <div className="mb-0 text-lg text-gray-400">{tagline}</div>
                </div>
                <div className="flex flex-row justify-between datos">
                  <div className="flex flex-col datos_col">
                    <div className="text-sm text-gray-400">Popularity:</div>
                    <div className="popularity">{popularity}</div>
                  </div>
                  <div className="flex flex-col datos_col">
                    <div className="text-sm text-gray-400">Release date:</div>
                    <div className="release">{date}</div>
                  </div>
                  <div className="flex flex-col datos_col">
                    <div className="text-sm text-gray-400">Runtime:</div>
                    <div className="release">{runtime} min</div>
                  </div>
                </div>
                <div className="flex flex-col overview">
                  <div className="flex flex-col"></div>
                  <div className="mb-2 text-xs text-gray-400">Overview:</div>
                  <p className="mb-6 text-xs text-gray-100">{details}</p>
                </div>
              </div>
            </div>
          </div>
          <img
            className="absolute inset-0 w-full transform -translate-y-4 grayscale-0"
            src={`https://image.tmdb.org/t/p/w500${image}`}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
