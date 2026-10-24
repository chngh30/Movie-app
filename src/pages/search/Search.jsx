import { useState } from "react";
import fetchData from "../../api";
import requests from "../../requests";
import Navbar from "../browse/Navbar";
import MovieDetail from "../browse/MovieDetail";
import classes from "./Search.module.css";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function handleSearch(event) {
    event.preventDefault();

    const searchKeyword = keyword.trim();

    if (!searchKeyword) {
      setMovies([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const endpoint = `${requests.fetchSearch}&query=${encodeURIComponent(searchKeyword)}`;
      const data = await fetchData(endpoint);
      setMovies(data.results || []);
    } 
    catch (error) {
      console.error("Lỗi tìm kiếm phim:", error);
      setMovies([]);
    } 
    finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setKeyword("");
    setMovies([]);
    setSearched(false);
  }

  function handleMovieClick(movie) {
    if (selectedMovie?.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  }

  return (
    <>
      <Navbar />

      <main className={classes.searchPage}>
        <form
          className={classes.searchForm}
          onSubmit={handleSearch}
        >
          <div className={classes.searchInputRow}>
            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />

            <span className={classes.searchIcon} aria-hidden="true">
							<svg
								fill="#CCCCCC"
								viewBox="0 0 512 512"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128s-57.3 128-128 128z" />
							</svg>
						</span>
          </div>

          <div className={classes.searchActions}>
            <button
              type="button"
              className={classes.resetButton}
              onClick={handleReset}
            >
              RESET
            </button>

            <button
              type="submit"
              className={classes.searchButton}
            >
              SEARCH
            </button>
          </div>
        </form>

        <section className={classes.searchResults}>
          <h2>Search Result</h2>

          {loading && <p>Loading...</p>}

          {!loading && searched && movies.length === 0 && (
            <p>No movies found.</p>
          )}

          {!loading && movies.length > 0 && (
            <>
              <div className={classes.searchGrid}>
                {movies.map((movie) => (
                  <div
                    className={classes.searchItem}
                    key={movie.id}
                    onClick={() => handleMovieClick(movie)}
                  >
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {selectedMovie && (
                <MovieDetail movieData={selectedMovie} />
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
