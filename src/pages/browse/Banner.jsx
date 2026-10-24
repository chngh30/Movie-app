import { useState, useEffect } from 'react'
import requests from '../../requests'
import fetchData from "../../api";
import classes from './Browse.module.css'

export default function Banner() {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetchData(requests.fetchNetflixOriginals)
      .then(data => {
        const randomMovie = data.results[
          Math.floor(Math.random() * data.results.length - 1)
        ];
        setMovie(randomMovie);
      })
      .catch(error=>console.error('Lỗi API:', error))
  }, [])

  return (
    <div className={classes.banner}>
      {movie && (
        <div
          className={classes.bannerContent}
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`,
          }}
        >
          <div className={classes.bannerText}>
            <h2>{movie.name}</h2>
            <div className={classes.bannerButton}>
              <button>Play</button>
              <button>My List</button>
            </div>
            <p>{movie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}