import React, { useState, useEffect } from "react";
import MovieContainer from "./MovieContainer";
import MovieDetails from "./MovieDetails";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Navbar from "./Navbar";

function MoviesContainer() {
  // State to hold movies, genres, selected genre, and search query
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  //get the required props to do the details component
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [popularity, setPopularity] = useState("");
  const [runtime, setRuntime] = useState("");
  const [tagline, setTagline] = useState("");
  const [isMain, setMain] = useState(true);

  const handleClick = (e) => {
    if (!e.target.classList.contains("img")) {
      return;
    }
    const getMovieInfos = async (movie) => {
      const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

      let url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      url = `https://api.themoviedb.org/3/movie/${data.results[0].id}?api_key=${apiKey}`;
      const response2 = await fetch(url);
      const data2 = await response2.json();

      setTitle(data.results[0].title);
      setImage(data.results[0].poster_path);
      setDetails(data.results[0].overview);
      setDate(data.results[0].release_date);
      setPopularity(data.results[0].popularity);
      setRuntime(data2.runtime);
      setTagline(data2.tagline);
    };

    getMovieInfos(e.target.alt);
    toggleState();
  };

  const toggleState = () => {
    if (isMain) {
      document.getElementById("moviesContainer").style.display = "none";
      document.getElementById("movieDetails").style.display = "flex";
      setMain(false);
    } else {
      document.getElementById("moviesContainer").style.display = "flex";
      document.getElementById("movieDetails").style.display = "none";
      setMain(true);
    }
  };

  // Effect to fetch the list of genres when the component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Fetch the TMDB API key from environment variables
        const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

        // Fetch the list of genres from the API
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data and set the genres state
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Effect to fetch movies based on selected genre and search query
  useEffect(() => {
    // Function to fetch movies
    const fetchMovies = async () => {
      try {
        // Fetch the TMDB API key from environment variables
        const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

        // Construct the appropriate URL based on selected genre and search query
        let url = "";

        if (searchQuery.length && selectedGenre) {
          url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&with_genres=${selectedGenre}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
          console.log(url);
        } else if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
        } else if (selectedGenre) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&language=en-US&page=1&include_adult=false&with_genres=${selectedGenre}`;
        } else {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&language=en-US&page=1&include_adult=false`;
        }

        // Fetch movies based on the constructed URL
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data and set the movies state
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Call the fetchMovies function when selectedGenre or searchQuery changes
    fetchMovies();
  }, [selectedGenre, searchQuery]);

  return (
    <div className="">
      <div
        className="w-[100vw] py-12 flex flex-col items-center"
        id="moviesContainer"
      >
        {/* Page header */}
        <Navbar />
        {/* Search input and genre selector */}
        <div className="flex justify-between gap-4 w-[80vw] my-[5vh] flex-col sm:flex-row">
          {/* Search input */}
          <div className="flex flex-col min">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-gray-700 bg-gray-200 border border-gray-400 rounded focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          {/* Genre selector */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 pr-8 leading-tight text-white bg-black border border-gray-400 rounded appearance-none cursor-pointer focus:outline-none focus:bg-gray focus:border-gray-500"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Movie grid */}
        <div className="grid grid-cols-1 gap-12 mx-16 sm:mx-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {movies.map((movie) => (
            <div
              className="w-full rounded-lg shadow-lg"
              key={movie.id}
              onClick={handleClick}
            >
              <MovieContainer
                key={movie.id}
                title={movie.title}
                img={movie.poster_path}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="hidden max-h-screen overflow-hidden max-w-screen"
        id="movieDetails"
      >
        <button
          onClick={toggleState}
          className="fixed text-4xl font-bold text-white top-8 left-8"
        >
          <BsFillArrowLeftCircleFill />
        </button>

        <MovieDetails
          title={title}
          image={image}
          details={details}
          date={date}
          popularity={popularity}
          runtime={runtime}
          tagline={tagline}
        />
      </div>
    </div>
  );
}

export default MoviesContainer;
