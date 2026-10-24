import { useState, useEffect } from "react";
import fetchData from "../../api";
import MovieDetail from "./MovieDetail";
import classes from './Browse.module.css'

export default function MovieList({
  title, 
  endpoint, 
  isOriginal, 
  onMovieClick, 
  selectedMovie
}){
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData(endpoint)
      .then(data => {
        setMovies(data.results || []);
      })
      .catch(error => {
        console.error(`Lỗi lấy danh mục ${title}:`, error);
      })
  }, [endpoint])

  const currentMovie = movies.find(
    (movie) => movie.id === selectedMovie?.id
  );

  return (
    <section className={classes.movieList}>
      <h2>{title}</h2>

      <div className={classes.movieRow}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={
              isOriginal
                ? classes.poster
                : classes.backdrop
            }
            src={`https://image.tmdb.org/t/p/w500${
              isOriginal
                ? movie.poster_path
                : movie.backdrop_path
            }`}
            alt={movie.name || movie.title}
            onClick={() =>
              onMovieClick({
                ...movie,
                media_type: movie.media_type || (isOriginal ? "tv" : "movie"),
              })
            }
          />
        ))}
      </div>

      {currentMovie && (
        <MovieDetail movieData={selectedMovie} />
      )}
    </section>
  );
}